import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { getCategorySummary } from '../utils/filterUtils';

export const CategorySummary = () => {
  const { transactions, filter } = useContext(GlobalContext);
  
  const categorySummary = getCategorySummary(transactions, filter.timePeriod);
  
  const total = categorySummary.reduce((acc, item) => acc + item.amount, 0);

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': '🍔',
      'Transport': '🚗',
      'Entertainment': '🎬',
      'Bills': '💡',
      'Shopping': '🛍️',
      'Healthcare': '⚕️',
      'Education': '📚',
      'Other': '📦'
    };
    return icons[category] || '💰';
  };

  if (categorySummary.length === 0) {
    return (
      <div className="category-summary">
        <h3>📊 Expense Breakdown</h3>
        <p className="no-data">No expenses to display for the selected period</p>
      </div>
    );
  }

  return (
    <div className="category-summary">
      <h3>📊 Expense Breakdown</h3>
      <div className="category-list">
        {categorySummary.map(({ category, amount }) => {
          const percentage = total > 0 ? ((amount / total) * 100).toFixed(1) : 0;
          return (
            <div key={category} className="category-item">
              <div className="category-info">
                <span className="category-icon">{getCategoryIcon(category)}</span>
                <span className="category-name">{category}</span>
              </div>
              <div className="category-stats">
                <span className="category-amount">${amount.toFixed(2)}</span>
                <span className="category-percentage">{percentage}%</span>
              </div>
              <div className="category-bar">
                <div 
                  className="category-bar-fill" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="category-total">
        <strong>Total Expenses: </strong>
        <span className="total-amount">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};
