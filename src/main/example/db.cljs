(ns example.db
  (:require ["dayjs" :as dayjs]))

(defn get-today-string []
  (.format (dayjs) "LL"))

;; initial state of app-db
(defonce app-db
  {:transcations [{:id 1 :amount 200 :is-income? true :category {:id "1" :name "Salary" :group "Inflow"} :date (get-today-string) :account-id 1 :payee "McDonalds"}
                  {:id 2 :amount 200 :is-income? false :category {:id "3" :name "Groceries" :group "Need"} :date (get-today-string) :account-id 1 :payee "McDonalds"}
                  {:id 3 :amount 300 :is-income? true :category {:id "8" :name "Investments" :group "Inflow"} :date (get-today-string) :account-id 1 :payee "McDonalds"}
                  {:id 4 :amount 500 :is-income? false :category {:id "4" :name "Dining Out" :group "Want"} :date (get-today-string) :account-id 1 :payee "McDonalds"}]
   :categories [{:id "1" :name "Salary" :group "Inflow"}
                {:id "2" :name "Rent" :group "Bill"}
                {:id "3" :name "Groceries" :group "Need"}
                {:id "4" :name "Dining Out" :group "Want"}
                {:id "5" :name "Utilities" :group "Bill"}
                {:id "6" :name "Transportation" :group "Need"}
                {:id "7" :name "Entertainment" :group "Want"}
                {:id "8" :name "Investments" :group "Inflow"}
                {:id "9" :name "Healthcare" :group "Need"}
                {:id "10" :name "Shopping" :group "Want"}]
   :accounts [{:id 1 :name "Cash" :balance 1000.50}]
   :input {:show-date-picker false
           :transaction {:selected-date (dayjs)
                         :type "spending"
                         :amount nil
                         :category nil
                         :account-id 1}}})
