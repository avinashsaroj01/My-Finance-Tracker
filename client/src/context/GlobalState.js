
import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  error: null
};

// Create context
export const GlobalContext = createContext(initialState);

// Define the base URL based on the environment

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://my-finance-tracker-vikd.vercel.app/'  
  : 'http://localhost:5000/api';

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const getTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.message
      });
    }
  };

 
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  

  const addTransaction = async (transaction) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/transactions', transaction);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: response.data.data
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.message
      });
    }
  };

  useEffect(() => {
    // Fetch transactions on component mount
    getTransactions();
  }, []);

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      getTransactions,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
