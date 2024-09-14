(ns example.widgets
  (:require ["react-native" :as rn]
            [reagent.core :as r]))

(defn button [{:keys [style text-style on-press
                      disabled? disabled-style disabled-text-style]
               :or {on-press #()}} text]
  [:> rn/Pressable {:style (cond-> {:font-weight      :bold
                                    :font-size        18
                                    :padding          6
                                    :background-color :blue
                                    :border-radius    999
                                    :margin-bottom    20}
                             :always (merge style)
                             disabled? (merge {:background-color "#aaaaaa"}
                                              disabled-style))
                    :on-press on-press
                    :disabled disabled?}
   [:> rn/Text {:style (cond-> {:padding-left  12
                                :padding-right 12
                                :font-weight   :bold
                                :font-size     18
                                :color         :white}
                         :always (merge text-style)
                         disabled? (merge {:color :white}
                                          disabled-text-style))}
    text]])

;; (defn balance-card [{:keys [net-worth last-updated last-balance]}]
;;   (let [difference (- net-worth last-balance)
;;         increase? (pos? difference)]
;;     [:> rn/View {:style {:background-color "#ffffff"
;;                          :border-radius 8
;;                          :padding 16
;;                          :margin-bottom 20
;;                          :shadow-color "#000000"
;;                          :shadow-offset {:width 0 :height 2}
;;                          :shadow-opacity 0.1
;;                          :shadow-radius 4
;;                          :elevation 3}}
;;      [:> rn/View {:style {:flex-direction "row"
;;                           :justify-content "space-between"
;;                           :margin-bottom 8}}
;;       [:> rn/Text {:style {:font-size 14
;;                            :color "#666666"
;;                            :margin-right 50}}
;;        "Net Worth"]
;;       [:> rn/Text {:style {:font-size 14
;;                            :color "#666666"}}
;;        (str last-updated)]]
;;      [:> rn/Text {:style {:font-size 24
;;                           :font-weight "bold"
;;                           :margin-bottom 16}}
;;       (str "$" (.toFixed net-worth 2))]
;;      [:> rn/View {:style {:flex-direction "row"
;;                           :justify-content "space-between"
;;                           :align-items "center"}}

;;       [:> rn/View {:style {:flex-direction "row"
;;                            :align-items "center"}}
;;        [:> rn/Text {:style {:font-size 16
;;                             :font-weight "bold"
;;                             :color (if increase? "#4CAF50" "#F44336")}}
;;         (str (if increase? "+" "-") "$" (.toFixed (Math/abs difference) 2))]
;;        [:> rn/Text {:style {:font-size 20
;;                             :color (if increase? "#4CAF50" "#F44336")}}
;;         (if increase? "↑" "↓")]]]]))

(def Scrollable (js/require "../src/main/stories/Scrollable.tsx"))
(def scrollable (.-default Scrollable))

(def BalanceCard (.-default (js/require "../src/main/stories/BalanceCard.tsx")))