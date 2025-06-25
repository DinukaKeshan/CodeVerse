const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.generateToken);

// Manual
router.post('/register', authController.register);
router.post('/login', authController.login);

// Role update
router.post('/role', authMiddleware, authController.updateRole);

module.exports = router;
