const express = require('express');
const app = express();
const mysql = require('mysql');
const routes = require('./routes/index');

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'learning_simplified'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});