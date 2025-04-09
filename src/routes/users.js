const express = require('express');
const router = express.Router();
const {
	createUser,
	readUsers,
	readUser,
	updateUser,
	deleteUser
} = require('../controllers/users');

// ALL http://localhost/api/users GET, POST, PUT, DELETE

router.put('/:id', updateUser); // Update a user by ID
router.delete('/:id', deleteUser); // Delete a user by ID
router.post('/', createUser); // Create a new user
router.get('/:id', readUser); // Read a user by ID
router.get('/', readUsers); // Read all users

module.exports = router;
