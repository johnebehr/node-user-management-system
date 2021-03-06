const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.view);
router.post('/', userController.find);

// Add a user
router.get('/adduser', userController.showForm);
router.post('/adduser', userController.createUser);

// Edit a user
router.get('/edituser/:id', userController.editUser);
router.post('/edituser/:id', userController.updateUser);

// Show user detail
router.get('/viewuser/:id', userController.viewDetail);

// Delete a user
router.get('/:id', userController.deleteUser);

module.exports = router;