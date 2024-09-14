// const path = require('path');
// const express = require('express');
// const dotenv = require('dotenv');
// const colors = require('colors');
// const morgan = require('morgan');
// const connectDB = require('./config/db');

// dotenv.config({ path: './config/config.env' });

// connectDB();

// const transactions = require('./routes/transactions');

// const app = express();

// // Middleware
// app.use(express.json());

// // Logging middleware for development
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// // API routes
// app.use('/api/v1/transactions', transactions);

// // Serve static files in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client', 'build')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
// );
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json());

// Enable CORS
app.use(cors()); // Add this line

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
