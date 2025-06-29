const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { createCourse, getInstructorCourses } = require('../controllers/course.controller');

// Optional: Restrict to 'Instructor' role
const restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

// Create a new course (Instructor only)
router.post('/', authMiddleware, restrictTo('Instructor'), createCourse);

// Get instructor's own courses
router.get('/my-courses', authMiddleware, restrictTo('Instructor'), getInstructorCourses);

module.exports = router;
