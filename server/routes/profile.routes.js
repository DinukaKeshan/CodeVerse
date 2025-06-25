const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const profileController = require('../controllers/profile.controller');

// Get current profile
router.get('/me', authMiddleware, profileController.getProfile);

// Update profile with file upload
router.put('/update', authMiddleware, profileController.uploadMiddleware, profileController.updateProfile);

module.exports = router;
