// const express= require('express');
// const router =  express.Router();
// const { getTransactions}= require('../controllers/transactions');

// router.get('/',(req,res)=> res.send('Hello'));
// module.exports= router;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const express = require('express');
// const router = express.Router();
// const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');

// router
//   .route('/')
//   .get(getTransactions)
//   .post(addTransaction);

// router
//   .route('/:id')
//   .delete(deleteTransaction);

// module.exports = router;
//+++++++++++++++++++++++++++++++++++++++++++++++++
const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactionController');

// Define routes
router.get('/', getTransactions);
router.post('/', addTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;
