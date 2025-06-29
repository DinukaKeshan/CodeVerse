const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { addTimelineItem, getCourseTimeline } = require('../controllers/timeline.controller');

// Optional: Restrict to 'Instructor' for adding timeline items
const restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

// Add a timeline item to a course
router.post('/:courseId', authMiddleware, restrictTo('Instructor'), addTimelineItem);

// Get all timeline items for a course (Student or Instructor)
router.get('/:courseId', authMiddleware, getCourseTimeline);

module.exports = router;
