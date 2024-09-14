// import Transaction from "../components/Transaction"

// export default (state, action) =>{
//     switch(action.type){
//         case 'DELETE_TRANSACTION':
//             return {
//                 ...state,
//                 Transactions: state.transations.filter(transation=>transation.id !==action.payload)
//             }
//         default:
//             return state
//     }
// }
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
