const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.createUser);

module.exports = router;