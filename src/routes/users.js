const express = require('express');
const router = express.Router();
const {
	validateUserId,
	validateUserInfo,
	validateUserCreation
} = require('../middlewares/validateUser');

const {
	createUser,
	readUsers,
	readUser,
	updateUser,
	deleteUser
} = require('../controllers/users');

// ALL http://localhost:3000/api/users GET, POST, PUT, DELETE

router.put('/:id', validateUserId, validateUserInfo, updateUser); // Update a user by ID
router.delete('/:id', validateUserId, deleteUser); // Delete a user by ID
router.post('/', validateUserInfo, validateUserCreation, createUser); // Create a new user
router.get('/:id', validateUserId, readUser); // Read a user by ID
router.get('/', readUsers); // Read all users

module.exports = router;
