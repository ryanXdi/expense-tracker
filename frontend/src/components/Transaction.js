import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ( {transaction} ) => {
  
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
        <div className="transaction-details">
            <span className="transaction-text">{transaction.text}</span>
            <div className="transaction-meta">
                <span className="transaction-category">{transaction.category}</span>
                <span className="transaction-date">{formatDate(transaction.date)}</span>
            </div>
        </div>
        <span className="transaction-amount">{sign}${Math.abs(transaction.amount)}</span>
        <button onClick={()=> deleteTransaction(transaction._id)} className="delete-btn">x</button>
    </li>  
  )
}
