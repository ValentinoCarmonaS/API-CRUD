/**
 * Create a new user
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {};

/**
 * Read all users
 * @param {*} req
 * @param {*} res
 */
const readUsers = async (req, res) => {
	try {
		const users = await user.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

/**
 * Read a user by ID
 * @param {*} req
 * @param {*} res
 */
const readUser = async (req, res) => {};

/**
 * Update a user by ID
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {};

/**
 * Delete a user by ID
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {};

module.exports = {
	createUser,
	readUsers,
	readUser,
	updateUser,
	deleteUser
};
