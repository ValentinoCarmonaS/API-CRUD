const express = require('express');
const router = express.Router();
const user = require('../models/nosql/user');
const {
	createUser,
	readUsers,
	readUser,
	updateUser,
	deleteUser
} = require('../controllers/users');

// ALL http://localhost/api/users GET, POST, PUT, DELETE

router.post('/', createUser); // Create a new user
router.get('/', readUsers); // Read all users
router.get('/:id', readUser); // Read a user by ID
router.put('/:id', updateUser); // Update a user by ID
router.delete('/:id', deleteUser); // Delete a user by ID

module.exports = router;
