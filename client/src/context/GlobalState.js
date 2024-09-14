// import { Children } from "react";
// import AppReducer from './AppReducer';
// import React , { createContext, useReducer} from "react";
// //Initial state
// const initialState = {
//     transactions:
//     [
//           { id: 1, text: 'Flower', amount: -20 },
//           { id: 2, text: 'Salary', amount: 300 },
//           { id: 3, text: 'Book', amount: -10 },
//           { id: 4, text: 'Camera', amount: 150 }
//         ]
// }
// // Create Context
// export const GlobalContext = createContext(initialState);

// //provider component
// export const GlobalProvider=({children}) =>{
//     const [state,dispatch]= useReducer(AppReducer,initialState);
//     Actions
//     function deleteTransaction(id){
//         dispatch({
//             type:'DELETE_TRANSACTION',
//             payload: id
//         });
//     }
    
      
//     return (<GlobalContext.Provider value ={{
//         transactions:state.transactions,
//         deleteTransaction
//     }}>
//         {children}
//     </GlobalContext.Provider>);
// }
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

  // const deleteTransaction = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/v1/transactions/${id}`);
  //     dispatch({
  //       type: 'DELETE_TRANSACTION',
  //       payload: id
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: 'TRANSACTION_ERROR',
  //       payload: error.message
  //     });
  //   }
  // };
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
