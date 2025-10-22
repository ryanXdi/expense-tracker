import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from "./AppReducer";

const API_URL = process.env.NODE_ENV === 'production'
  ? '/api/transactions'
  : 'http://localhost:5001/api/transactions';

const initialState = {
  transactions: [],
  loading: true,
  error: null,
  filter: {
    timePeriod: 'all',
    category: 'all'
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        getTransactions();
    }, []);

    async function getTransactions() {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.message
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.message
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        };

        try {
            const res = await fetch(API_URL, config);
            const data = await res.json();

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: data.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.message
            });
        }
    }

    function setFilter(filterType, value) {
      dispatch({
        type: 'SET_FILTER',
        payload: { filterType, value }
      });
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        loading: state.loading,
        error: state.error,
        filter: state.filter,
        deleteTransaction,
        addTransaction,
        setFilter
    }}>
        {children}
    </GlobalContext.Provider>);
}