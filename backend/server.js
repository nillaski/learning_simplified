const express = require('express');
const app = express();
const routes = require('./routes/index');

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});