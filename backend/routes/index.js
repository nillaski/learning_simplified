const express = require('express');
const router = express.Router();

const authRoutes = require('../utils/auth');
const coursesRoutes = require('../utils/courses');
const usersRoutes = require('../utils/users');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome to learning simplifies"
    });
});
// Auth routes
router.use('/auth', authRoutes);

// Courses routes
router.use('/courses', coursesRoutes);

// Users routes
router.use('/users', usersRoutes);

module.exports = router;