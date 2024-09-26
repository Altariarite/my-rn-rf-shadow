(ns example.db
  (:require ["dayjs" :as dayjs]))

(defn get-today-string []
  (.format (dayjs) "LL"))

;; initial state of app-db
(defonce app-db
  {:transcations [{:id 1 :amount 200 :is-income? true :tags ["food" "restaurants"] :date (get-today-string) :account-id 1 :payee "McDonalds"}
                  {:id 2 :amount 200 :is-income? false :tags ["food" "restaurants"] :date (get-today-string) :account-id 1 :payee "McDonalds"}
                  {:id 3 :amount 300 :is-income? true :tags ["food" "restaurants"] :date (get-today-string) :account-id 1 :payee "McDonalds"}
                  {:id 4 :amount 500 :is-income? false :tags ["food" "restaurants"] :date (get-today-string) :account-id 1 :payee "McDonalds"}]
   :accounts [{:id 1 :name "Cash" :balance 1000.50}]
   :current-date (get-today-string)
   :input {:show-date-picker false
           :selected-date (dayjs)
           :transaction {:date (get-today-string)
                         :type "spending"
                         :amount nil
                         :tags []
                         :account-id 1}}})
