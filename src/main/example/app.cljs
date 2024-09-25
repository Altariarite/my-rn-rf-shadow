(ns example.app
  (:require ["@react-navigation/bottom-tabs" :as rnn-tabs]
            ["@react-navigation/native" :as rnn]
            ["@react-navigation/native-stack" :as rnn-stack]
            ["expo-status-bar" :refer [StatusBar]]
            ["react-native" :as rn]
            [example.pubsubs]
            [example.widgets :refer [CashflowScreen InputScreen]]
            [expo.root :as expo-root]
            [re-frame.core :as rf]
            [reagent.core :as r]))

(defonce shadow-splash (js/require "../assets/shadow-cljs.png"))
(defonce cljs-splash (js/require "../assets/cljs.png"))

(defonce Tabs (rnn-tabs/createBottomTabNavigator))
(defonce Stack (rnn-stack/createNativeStackNavigator))

(def dummy-data
  [{:id "1" :netWorth 10000.50 :lastUpdated "2023-04-15" :difference 500.25}
   {:id "2" :netWorth 15000.75 :lastUpdated "2023-04-16" :difference -200.50}
   {:id "3" :netWorth 8000.00 :lastUpdated "2023-04-17" :difference 100.00}
   {:id "4" :netWorth 12500.25 :lastUpdated "2023-04-18" :difference 300.75}
   {:id "5" :netWorth 9800.50 :lastUpdated "2023-04-19" :difference -150.25}])


(defn home [^js props]
  (r/with-let [counter (rf/subscribe [:get-counter])
               tap-enabled? (rf/subscribe [:counter-tappable?])]
    [:> rn/View {:style {:flex 1
                         :padding-vertical 50
                         :justify-content :space-between
                         :align-items :center
                         :background-color :white}}
     [:> rn/View {:style {:align-items :center}}
      ;; [:> BalanceCard {:netWorth 1000.50
      ;;                  :lastUpdated "2023-04-15"
      ;;                  :difference 50.25}]
      ;; [button {:on-press #(rf/dispatch [:inc-counter])
      ;;          :disabled? (not @tap-enabled?)
      ;;          :style {:background-color :blue}}
      ;;  "Tap me, I'll count"]
      ]
     [:> rn/View {:style {:align-items :center}}
      ;; [button {:on-press (fn []
      ;;                      (-> props .-navigation (.navigate "About")))}
      ;;  "Tap me, I'll navigate"]
      ]
    ;;  [:> rn/View
    ;;   [:> rn/View {:style {:flex-direction :row
    ;;                        :align-items :center
    ;;                        :margin-bottom 20}}
    ;;    [:> rn/Image {:style {:width  160
    ;;                          :height 160}
    ;;                  :source cljs-splash}]
    ;;    [:> rn/Image {:style {:width  160
    ;;                          :height 160}
    ;;                  :source shadow-splash}]]
    ;;   [:> rn/Text {:style {:font-weight :normal
    ;;                        :font-size   15
    ;;                        :color       :blue}}
    ;;    "Using: shadow-cljs+expo+reagent+re-frame"]]
     [:> StatusBar {:style "auto"}]]))

(defn- about
  []
  (r/with-let [counter (rf/subscribe [:get-counter])]
    [:> rn/View {:style {:flex 1
                         :padding-vertical 50
                         :padding-horizontal 20
                         :justify-content :space-between
                         :align-items :flex-start
                         :background-color :white}}
     [:> rn/View {:style {:align-items :flex-start}}
      [:> rn/Text {:style {:font-weight   :bold
                           :font-size     54
                           :color         :blue
                           :margin-bottom 20}}
       "About Example App"]
      [:> rn/Text {:style {:font-weight   :bold
                           :font-size     20
                           :color         :blue
                           :margin-bottom 20}}
       (str "Counter is at: " @counter)]
      [:> rn/Text {:style {:font-weight :normal
                           :font-size   15
                           :color       :blue}}
       "Built with React Native, Expo, Reagent, re-frame, and React Navigation"]]
     [:> StatusBar {:style "auto"}]]))

(defn settings [^js props]
  [:> rn/SafeAreaView {:style {:flex 1}
                       :justifyContent "flex-end"}
   [:> CashflowScreen {:items {:2024-05-01 [{:id "1" :amount 100 :type "income" :tags ["food" "restaurants"]}
                                            {:id "2" :amount 200 :type "expense" :tags ["food" "restaurants"]}]
                               :2024-05-02 [{:id "3" :amount 300 :type "income" :tags ["food" "restaurants"]}]
                               :2024-05-03 [{:id "4" :amount 500 :type "expense" :tags ["food" "restaurants"]}]}
                       :onAddItem #(-> (.-navigation props) (.navigate "InputModal"))}]])

(defn input-modal [^js props]
  [:> InputScreen {:account-name "Cash"
                   :remaining-balance 1000.50
                   :current-date "2023-04-15"
                   :on-amount-change #(println "Amount changed to:" %)
                   :on-calendar-press #(println "Calendar pressed")
                   :on-tag-press #(println "Tag pressed")
                   :on-note-press #(println "Note pressed")
                   :on-transaction-type-change #(println "Transaction type changed to:" %)
                   :transaction-type "spending"
                   :onBack #(-> props .-navigation .goBack)}])

(defn root []
  (r/with-let [!root-state (rf/subscribe [:navigation/root-state])
               save-root-state! (fn [^js state]
                                  (rf/dispatch [:navigation/set-root-state state]))
               add-listener! (fn [^js navigation-ref]
                               (when navigation-ref
                                 (.addListener navigation-ref "state" save-root-state!)))]
    [:> rnn/NavigationContainer {:ref add-listener!
                                 :initialState (when @!root-state (-> @!root-state .-data .-state))}
     [:> Stack.Navigator
      [:> Stack.Group
       [:> Stack.Screen {:name "MainTabs"
                         :options {:headerShown false}
                         :component (fn [props] (r/as-element [settings props]))}]]
      [:> Stack.Group {:screenOptions {:presentation "modal"}}
       [:> Stack.Screen {:name "InputModal"
                         :options {:headerShown false}
                         :component (fn [props] (r/as-element [input-modal props]))}]]]]))

(defn start
  {:dev/after-load true}
  []
  (expo-root/render-root (r/as-element [root])))

(defn init []
  (rf/dispatch-sync [:initialize-db])
  (start))