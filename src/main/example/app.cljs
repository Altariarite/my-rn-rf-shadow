(ns example.app
  (:require ["expo-status-bar" :refer [StatusBar]]
            ["expo" :as expo]
            ["react-native" :as rn]
            [example.pubsubs]
            [example.widgets :refer [CashflowScreen CategoryScreen InputScreen]]
            [expo.root :as expo-root]
            [re-frame.core :as rf]
            [re-frisk-remote.core :as re-frisk-remote]
            [reagent.core :as r]
            [steroid.rn.navigation.bottom-tabs :as bottom-tabs]
            [steroid.rn.navigation.core :as rnn]
            [steroid.rn.core :as steroid]
            steroid.rn.navigation.events
            [steroid.rn.navigation.safe-area :as safe-area]
            [steroid.rn.navigation.stack :as stack]
            [steroid.rn.reloader :as reloader]))

(re-frisk-remote/enable)
;; (.ignoreLogs rn/LogBox #js [#"Warning: Got a component"])

(defonce shadow-splash (js/require "../assets/shadow-cljs.png"))
(defonce cljs-splash (js/require "../assets/cljs.png"))





(defn- about
  []

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
    [:> rn/Text {:style {:font-weight :normal
                         :font-size   15
                         :color       :blue}}
     "Built with React Native, Expo, Reagent, re-frame, and React Navigation"]]
   [:> StatusBar {:style "auto"}]])

(defn cashflow-screen [^js props]
  [safe-area/safe-area-view {:style {:flex 1}
                             :justifyContent "flex-end"}
   [:> CashflowScreen {:items {:2024-05-01 [{:id "1" :amount 100 :type "income" :tags ["food" "restaurants"]}
                                            {:id "2" :amount 200 :type "expense" :tags ["food" "restaurants"]}]
                               :2024-05-02 [{:id "3" :amount 300 :type "income" :tags ["food" "restaurants"]}]
                               :2024-05-03 [{:id "4" :amount 500 :type "expense" :tags ["food" "restaurants"]}]}
                       :onAddItem #(rf/dispatch [:add-item])}]])

(defn input-modal [^js props]
  (r/with-let [show-date-picker? (rf/subscribe [:show-date-picker?])
               selected-date (rf/subscribe [:selected-date])
               transaction-type (rf/subscribe [:transaction-type])
               current-date (rf/subscribe [:current-date])
               current-category (rf/subscribe [:current-category-name])]
    [:> InputScreen {:account-name "Cash"
                     :remaining-balance 1000.50
                     :selected-date @selected-date
                     :current-date @current-date
                     :current-category @current-category
                     :on-amount-change #(println "Amount changed to:" %)
                     :on-calendar-press #(rf/dispatch [:toggle-date-picker])
                     :show-date-picker @show-date-picker?
                     :on-date-change #(rf/dispatch [:set-selected-date (-> ^js/Date % .-date)])
                     :on-category-press #(rf/dispatch [:navigate-to :category])
                     :on-transaction-type-change #(rf/dispatch [:select-transaction-type %])
                     :transaction-type @transaction-type
                     :onBack #(rf/dispatch [:navigate-back])}]))

(defn category [^js props]
  (r/with-let [categories (rf/subscribe [:categories])]
    [:> CategoryScreen {:onBack #(rf/dispatch [:navigate-back])
                        :categories @categories
                        :onCategoryPress #(rf/dispatch [:select-category %])}]))


(defn main-stack []
  [stack/stack
   [{:name :cashflow
     :component cashflow-screen}
    {:name :input
     :component input-modal
     :options {:headerRight (fn []
                              (r/as-element
                               [:> rn/TouchableOpacity
                                {:on-press #(rf/dispatch [:navigate-back])
                                 :style {:padding 10}}
                                [:> rn/Text {:style {:color "#808080"
                                                     :font-size 16
                                                     :font-weight "bold"}}
                                 "Done"]]))
               :title "Add Transaction"}}
    {:name :category
     :component category}]])

(defn tab-navigator []
  [bottom-tabs/bottom-tab
   [{:name :main-cashflow
     :options {:headerShown false}
     :component main-stack}
    {:name :about
     :component about}]])

(defn root []
  [(rnn/create-navigation-container-reload
    [tab-navigator])])

(defn register-reload-comp [app-root]

  (expo/registerRootComponent

   (reagent.core/reactify-component
    (fn []
      (when steroid.rn.core/debug?
        @steroid.rn.core/cnt)
      [steroid.rn.core/view {:style {:flex 1}}
       [app-root]
       (when steroid.rn.core/debug?
         [steroid.rn.core/reload-view])]))))


(defn start
  {:dev/after-load true}
  []
  (register-reload-comp root))

(defn init []
  (rf/dispatch-sync [:initialize-db])
  (start))

