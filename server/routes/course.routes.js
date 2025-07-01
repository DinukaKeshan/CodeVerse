const express = require('express');
const router = express.Router();

const Course = require('../models/course.model');
const authMiddleware = require('../middleware/auth.middleware');
const {
  createCourse,
  getInstructorCourses,
  enrollInCourse,
  getEnrolledCourses
} = require('../controllers/course.controller');

// Optional: Restrict to specific role
const restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

// ✅ Public: Get all courses (for students & instructors)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'displayName');
    res.json(courses);
  } catch (error) {
    console.error('Fetch All Courses Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Instructor-only: Create and view their own courses
router.post('/', authMiddleware, restrictTo('Instructor'), createCourse);
router.get('/my-courses', authMiddleware, restrictTo('Instructor'), getInstructorCourses);

// ✅ Student-only: Enroll in a course and view enrolled courses
router.post('/enroll/:courseId', authMiddleware, restrictTo('Student'), enrollInCourse);
router.get('/enrolled', authMiddleware, restrictTo('Student'), getEnrolledCourses);

module.exports = router;
