(ns example.pubsubs
  (:require [re-frame.core :as rf]
            [example.db :as db :refer [app-db]]))

;; Pub
(rf/reg-event-db
 :initialize-db
 (fn [_ _]
   app-db))

(rf/reg-event-db
 :navigation/set-root-state
 (fn [db [_ navigation-root-state]]
   (assoc-in db [:navigation :root-state] navigation-root-state)))


;; Toggle date picker
(rf/reg-event-db
 :toggle-date-picker
 (fn [db _]
   (update-in db [:input :show-date-picker] not)))

(rf/reg-sub
 :show-date-picker?
 (fn [db _]
   (get-in db [:input :show-date-picker])))


(rf/reg-sub
 :navigation/root-state
 (fn [db _]
   (get-in db [:navigation :root-state])))


