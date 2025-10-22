// Filter transactions by date
export const filterTransactionsByDate = (transactions, timePeriod) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch(timePeriod) {
    case 'today':
      return transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= today;
      });
    
    case 'week':
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= weekAgo;
      });
    
    case 'month':
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate >= monthStart;
      });
    
    case 'all':
    default:
      return transactions;
  }
};

// Filter transactions by both date and category
export const filterTransactions = (transactions, filter) => {
  let filtered = filterTransactionsByDate(transactions, filter.timePeriod);
  
  if (filter.category !== 'all') {
    filtered = filtered.filter(t => t.category === filter.category);
  }
  
  return filtered;
};

// Get expense summary by category
export const getCategorySummary = (transactions, timePeriod) => {
  const filtered = filterTransactionsByDate(transactions, timePeriod);
  const expenses = filtered.filter(t => t.amount < 0);
  
  const summary = {};
  expenses.forEach(expense => {
    const category = expense.category;
    if (!summary[category]) {
      summary[category] = 0;
    }
    summary[category] += Math.abs(expense.amount);
  });
  
  // Convert to array and sort by amount
  return Object.entries(summary)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};
