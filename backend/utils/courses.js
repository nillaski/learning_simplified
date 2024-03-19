const express = require('express');
const router = express.Router();

// Get all courses
router.get('/', (req, res) => {
  const query = 'SELECT * FROM courses';
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

// Get a specific course
router.get('/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const query = 'SELECT * FROM courses WHERE id = ?';
  connection.query(query, [courseId], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(result[0]);
  });
});

// Create a new course
router.post('/', (req, res) => {
  const { title, description, instructor } = req.body;
  const query = 'INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)';
  connection.query(query, [title, description, instructor], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Course created successfully' });
  });
});

// Update a course
router.put('/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const { title, description, instructor } = req.body;
  const query = 'UPDATE courses SET title = ?, description = ?, instructor = ? WHERE id = ?';
  connection.query(query, [title, description, instructor, courseId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully' });
  });
});

// Delete a course
router.delete('/:courseId', (req, res) => {
  const courseId = req.params.courseId;
  const query = 'DELETE FROM courses WHERE id = ?';
  connection.query(query, [courseId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  });
});

module.exports = router;