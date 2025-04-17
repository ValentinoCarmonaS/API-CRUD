const { usersModel } = require('../models/index');
const jwt = require('jsonwebtoken');

/**
 * Function to handle user login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const loginUser = async (req, res, next) => {
	try {
		// Get the request body
		const { email, password } = req.body;

		// Find the user by email
		const user = await usersModel.findOne({ email });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Invalid email or password'
			});
		}

		// Compare the password with the hashed password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: 'Invalid email or password'
			});
		}

		// Generate a token
		const token = jwt.sign(
			{
				id: user._id,
				role: user.role
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		res.status(200).json({
			success: true,
			message: 'Login successful',
			data: {
				token,
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role
				}
			}
		});
	} catch (err) {
		next(err); // Pass the error to the next middleware
	}
};

module.exports = {
	loginUser
};
