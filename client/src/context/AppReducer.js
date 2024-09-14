
const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
        error: null
      };
    
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        error: null
      };
    
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload),
        error: null
      };
      
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

export default AppReducer;
