import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const FilterControls = () => {
  const { filter, setFilter } = useContext(GlobalContext);

  const categories = ['all', 'Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Healthcare', 'Education', 'Other', 'Income'];
  const timePeriods = [
    { value: 'today', label: '📅 Today' },
    { value: 'week', label: '📆 This Week' },
    { value: 'month', label: '📊 This Month' },
    { value: 'all', label: '🗓️ All Time' }
  ];

  return (
    <div className="filter-controls">
      <h3>🔍 Filter & Sort</h3>
      <div className="filter-group">
        <label htmlFor="time-filter">Time Period</label>
        <select 
          id="time-filter"
          value={filter.timePeriod}
          onChange={(e) => setFilter('timePeriod', e.target.value)}
          className="filter-select"
        >
          {timePeriods.map(period => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>
        <select 
          id="category-filter"
          value={filter.category}
          onChange={(e) => setFilter('category', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          {categories.slice(1).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
