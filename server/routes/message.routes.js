const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Order matters: static routes first, dynamic ones last
router.post('/send', authMiddleware, messageController.sendMessage);
router.get('/conversations', authMiddleware, messageController.getStudentConversations);
router.get('/:receiverId', authMiddleware, messageController.getMessages);

module.exports = router;
