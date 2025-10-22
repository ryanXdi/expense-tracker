import React, { useContext, useState } from 'react'
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState'
import { filterTransactions } from '../utils/filterUtils';

export const TransactionList = () => {
    const { transactions, filter } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 10;
    
    const filteredTransactions = filterTransactions(transactions, filter);
    
    // Calculate pagination
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    return (
        <div>
            <h3>📋 Transaction History ({filteredTransactions.length})</h3>
            {filteredTransactions.length === 0 ? (
                <p className="no-transactions">No transactions found for the selected filters</p>
            ) : (
                <>
                    <ul id="list" className="list">
                        {currentTransactions.map(transaction => (
                            <Transaction key={transaction.id} transaction={transaction}/>
                        ))}
                    </ul>
                    
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button 
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="pagination-btn"
                            >
                                ← Previous
                            </button>
                            
                            <div className="pagination-numbers">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => paginate(index + 1)}
                                        className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                            
                            <button 
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="pagination-btn"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                    
                    {totalPages > 1 && (
                        <div className="pagination-info">
                            Showing {indexOfFirstTransaction + 1} - {Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length} transactions
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
