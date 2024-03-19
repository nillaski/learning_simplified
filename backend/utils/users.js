const express = require('express');
const connection = require('../utils/connection');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  const query = 'SELECT id, username, email FROM users';
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

// Get a specific user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT id, username, email FROM users WHERE id = ?';
  connection.query(query, [userId], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result[0]);
  });
});

// Update a user
router.put('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;
  const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  connection.query(query, [username, email, userId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
});

// Delete a user
router.delete('/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [userId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

module.exports = router;