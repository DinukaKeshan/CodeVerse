const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructor.controller');

router.get('/all', instructorController.getAllInstructors);

module.exports = router;