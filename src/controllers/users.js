const { usersModel } = require('../models/index');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           example:
 *             name: "María García"
 *             email: "maria@ejemplo.com"
 *             password: "password123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: "User created successfully"
 *               data:
 *                 _id: "64f7a4b5c8d9e1f2a3b4c5d6"
 *                 name: "María García"
 *                 email: "maria@ejemplo.com"
 *                 role: "user"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Token no válido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const createUser = async (req, res, next) => {
	try {
		const body = req.body; // Get the request body
		const data = await usersModel.create(body); // Create a new user in the database
		res.status(201).json({
			success: true,
			message: 'User created successfully',
			// Return the created user data, excluding the password
			data: {
				_id: data._id,
				name: data.name,
				email: data.email,
				role: data.role
			}
		});
	} catch (error) {
		next(error); // Pass the error to the next middleware
	}
};

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersListResponse'
 *             example:
 *               success: true
 *               message: "Users fetched successfully"
 *               users:
 *                 - _id: "64f7a4b5c8d9e1f2a3b4c5d6"
 *                   name: "Juan Pérez"
 *                   email: "juan@ejemplo.com"
 *                   role: "user"
 *                 - _id: "64f7a4b5c8d9e1f2a3b4c5d7"
 *                   name: "María García"
 *                   email: "maria@ejemplo.com"
 *                   role: "admin"
 *       401:
 *         description: Token no válido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const readUsers = async (req, res, next) => {
	try {
		const users = await usersModel.find().select('-password'); // Find all users in the database
		res.status(200).json({
			success: true,
			message: 'Users fetched successfully',
			users
		}); // Return the list of users
	} catch (error) {
		next(error); // Pass the error to the next middleware
	}
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         example: "64f7a4b5c8d9e1f2a3b4c5d6"
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetailResponse'
 *             example:
 *               success: true
 *               message: "User fetched successfully"
 *               user:
 *                 _id: "64f7a4b5c8d9e1f2a3b4c5d6"
 *                 name: "Juan Pérez"
 *                 email: "juan@ejemplo.com"
 *                 role: "user"
 *       400:
 *         description: ID de usuario inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Token no válido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User not found"
 *               error: "User not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const readUser = async (req, res, next) => {
	try {
		// Get the user ID from the request parameters
		const { id } = req.params;
		const user = await usersModel.findById(id); // Find the user by ID

		// Check if user exists
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
				error: new Error('User not found').message
			});
		}

		res.status(200).json({
			success: true,
			message: 'User fetched successfully',
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			}
		}); // Return the user data
	} catch (error) {
		next(error); // Pass the error to the next middleware
	}
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         example: "64f7a4b5c8d9e1f2a3b4c5d6"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 description: Nombre del usuario (opcional)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario (opcional)
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Contraseña del usuario (opcional)
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: Rol del usuario (opcional)
 *           example:
 *             name: "Juan Carlos Pérez"
 *             email: "juancarlos@ejemplo.com"
 *             role: "admin"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetailResponse'
 *             example:
 *               success: true
 *               message: "User updated successfully"
 *               user:
 *                 _id: "64f7a4b5c8d9e1f2a3b4c5d6"
 *                 name: "Juan Carlos Pérez"
 *                 email: "juancarlos@ejemplo.com"
 *                 role: "admin"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Token no válido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const updateUser = async (req, res, next) => {
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
				message: 'User not found',
				error: new Error('User not found').message
			});
		}

		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			user
		}); // Return the updated user data
	} catch (error) {
		next(error); // Pass the error to the next middleware
	}
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         example: "64f7a4b5c8d9e1f2a3b4c5d6"
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetailResponse'
 *             example:
 *               success: true
 *               message: "User deleted successfully"
 *               user:
 *                 _id: "64f7a4b5c8d9e1f2a3b4c5d6"
 *                 name: "Juan Pérez"
 *                 email: "juan@ejemplo.com"
 *                 role: "user"
 *       400:
 *         description: ID de usuario inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Token no válido o ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const deleteUser = async (req, res, next) => {
	try {
		// Get the user ID from the request parameters
		const { id } = req.params;
		const user = await usersModel.findByIdAndDelete(id); // Find and delete the user by ID

		// Check if user exists
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
				error: new Error('User not found').message
			});
		}

		// Return a success response and the deleted user data
		res.status(200).json({
			success: true,
			message: 'User deleted successfully',
			user
		});
	} catch (error) {
		next(error); // Pass the error to the next middleware
	}
};

module.exports = {
	createUser,
	readUsers,
	readUser,
	updateUser,
	deleteUser
};
