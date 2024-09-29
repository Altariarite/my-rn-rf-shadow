(ns example.widgets
  (:require ["react-native" :as rn]
            [reagent.core :as r]))

(def Modal (.-default (js/require "../src/main/stories/Modal.tsx")))


(def InputScreen (.-default (js/require "../src/main/stories/InputScreen.tsx")))
(def CashflowScreen (.-default (js/require "../src/main/stories/CashflowScreen.tsx")))
(def CategoryScreen (.-default (js/require "../src/main/stories/CategoryScreen.tsx")))