(ns example.pubsubs
  (:require ["dayjs" :as dayjs]
            [example.db :as db :refer [app-db]]
            [re-frame.core :as rf]
            steroid.rn.navigation.events))

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

;; Selected date
(rf/reg-event-db
 :set-selected-date
 (fn [db [_ selected-date]]
   (assoc-in db [:input :transaction :selected-date] selected-date)))

(rf/reg-sub
 :selected-date
 (fn [db _]
   (dayjs (get-in db [:input :transaction :selected-date]))))

;; Current date
(rf/reg-sub
 :current-date
 :<- [:selected-date]
 (fn [selected-date _]
   (.format selected-date "LL")))

;; Select transaction type
(rf/reg-event-db
 :select-transaction-type
 (fn [db [_ transaction-type]]
   (assoc-in db [:input :transaction :type] transaction-type)))

(rf/reg-sub
 :transaction-type
 (fn [db _]
   (get-in db [:input :transaction :type])))

(rf/reg-sub
 :navigation/root-state
 (fn [db _]
   (get-in db [:navigation :root-state])))

;; Select category
(rf/reg-event-fx
 :select-category
 (fn [cofx [_ category]]
   {:db (assoc-in (:db cofx) [:input :transaction :category] (js->clj category :keywordize-keys true))
    :fx [[:dispatch [:navigate-back]]]}))

(rf/reg-sub
 :categories
 (fn [db _]
   (get-in db [:categories])))

(rf/reg-sub
 :current-category-name
 (fn [db _]
   (get-in db [:input :transaction :category :name])))

;; Add Item
(rf/reg-event-fx
 :add-item
 (fn [cofx [_]]
   {:db (assoc-in (:db cofx) [:input]  {:show-date-picker false
                                        :transaction {:selected-date (dayjs)
                                                      :type "spending"
                                                      :amount nil
                                                      :category nil
                                                      :account-id 1}})
    :fx [[:dispatch [:navigate-to :input]]]}))


