import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { FilterControls } from './components/FilterControls';
import { CategorySummary } from './components/CategorySummary';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';

import { GlobalProvider } from './context/GlobalState'; 

import './App.css';

function App() {
  const [activeTab, setActiveTab] = React.useState('transactions');

  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <div className="dashboard">
          <Balance />
          <IncomeExpenses />
        </div>
        
        <FilterControls />
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            📋 Transactions
          </button>
          <button 
            className={`tab ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            📊 Summary
          </button>
          <button 
            className={`tab ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            ➕ Add New
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'transactions' && <TransactionList />}
          {activeTab === 'summary' && <CategorySummary />}
          {activeTab === 'add' && <AddTransaction />}
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
