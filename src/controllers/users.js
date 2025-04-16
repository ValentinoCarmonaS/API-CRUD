const { usersModel } = require('../models/index');

/**
 * Create a new user
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
	try {
		const body = req.body; // Get the request body
		const data = await usersModel.create(body); // Create a new user in the database
		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data
		});
	} catch (error) {
		// Handle other errors
		res.status(500).json({
			success: false,
			message: 'Error creating user',
			error: error.message
		});
	}
};

/**
 * Read all users
 * @param {*} req
 * @param {*} res
 */
const readUsers = async (req, res) => {
	try {
		const users = await usersModel.find(); // Find all users in the database
		res.status(200).json({
			success: true,
			users
		}); // Return the list of users
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error fetching users',
			error: error.message
		}); // Handle any errors
	}
};

/**
 * Read a user by ID
 * @param {*} req
 * @param {*} res
 */
const readUser = async (req, res) => {
	try {
		// Get the user ID from the request parameters
		const { id } = req.params;
		const user = await usersModel.findById(id); // Find the user by ID

		// Check if user exists
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		res.status(200).json({
			success: true,
			user
		}); // Return the user data
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error fetching user',
			error: error.message
		}); // Handle any errors
	}
};

/**
 * Update a user by ID
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {
	try {
		// Get the user ID from the request parameters
		const { id } = req.params;
		const body = req.body; // Get the request body
		const user = await usersModel.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true
		}); // Find and update the user by ID

		// Check if user exists
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		res.status(200).json({
			success: true,
			user
		}); // Return the updated user data
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error updating user',
			error: error.message
		}); // Handle any errors
	}
};

/**
 * Delete a user by ID
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
	try {
		// Get the user ID from the request parameters
		const { id } = req.params;
		const user = await usersModel.findByIdAndDelete(id); // Find and delete the user by ID

		// Check if user exists
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			});
		}

		// Return a success response and the deleted user data
		res.status(200).json({
			success: true,
			message: 'User deleted successfully',
			user
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error deleting user',
			error: error.message
		}); // Handle any errors
	}
};

module.exports = {
	createUser,
	readUsers,
	readUser,
	updateUser,
	deleteUser
};
