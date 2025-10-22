import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { filterTransactionsByDate } from '../utils/filterUtils';

export const Balance = () => {
  const { transactions, filter } = useContext(GlobalContext);

  const filteredTransactions = filterTransactionsByDate(transactions, filter.timePeriod);
  const amounts = filteredTransactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div>
        <h4>Your Balance</h4>
        <h1 id="balance" className={total >= 0 ? 'positive' : 'negative'}>${total}</h1>
    </div>
  )
}