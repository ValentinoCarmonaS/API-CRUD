const { usersModel } = require('../models/index');

/**
 * Function to handle user login
 * @param {*} req
 * @param {*} res
 * @returns
 */
const loginUser = async (req, res) => {
	try {
		// Get the request body
		const { email, password } = req.body;

		// Find the user by email
		const user = await usersModel.findOne({ email });
		if (!user) {
			return res.status(401).json({
				message: 'Invalid email or password'
			});
		}

		// Compare the password with the hashed password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({
				message: 'Invalid email or password'
			});
		}

		res.status(200).json({
			message: 'Login successful',
			data: {
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role
				}
			}
		});
	} catch (err) {
		// Handle other errors
		res.status(500).json({
			message: 'Error logging in',
			error: err.message
		});
	}
};

module.exports = {
	loginUser
};
