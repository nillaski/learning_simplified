const express = require('express');
const router = express.Router();

// User registration
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'User created successfully' });
    });
  });
});

// User login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  });
});

module.exports = router;