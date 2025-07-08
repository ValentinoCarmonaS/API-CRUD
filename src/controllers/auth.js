const { usersModel } = require('../models/index');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "usuario@ejemplo.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "Login successful"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   id: "64f7a4b5c8d9e1f2a3b4c5d6"
 *                   name: "Juan Pérez"
 *                   email: "usuario@ejemplo.com"
 *                   role: "user"
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid email or password"
 *               error: "Invalid email or password"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
				message: 'Invalid email or password',
				error: new Error('Invalid email or password')
					.message
			});
		}

		// Compare the password with the hashed password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: 'Invalid email or password',
				error: new Error('Invalid email or password')
					.message
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
					password: password,
					role: user.role,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt
				}
			}
		});
	} catch (err) {
		next(err); // Pass the error to the next middleware
	}
};

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           example:
 *             name: "Valentino Carmona"
 *             email: "usuario@ejemplo.com"
 *             password: "password123"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "User registered successfully"
 *               data:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   id: "64f7a4b5c8d9e1f2a3b4c5d6"
 *                   name: "Juan Pérez"
 *                   email: "usuario@ejemplo.com"
 *                   role: "user"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               errors:
 *                 - msg: "Email already exists"
 *                   param: "email"
 *                   location: "body"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await usersModel.findOne({ email });
		// Check if the user already exists, is in the validation middleware

		const user = await usersModel.create({
			name,
			email,
			password
		});
		const token = jwt.sign(
			{ id: user._id, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);
		res.status(201).json({
			success: true,
			message: 'User registered successfully',
			data: {
				token,
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					password: password,
					role: user.role,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt
				}
			}
		});
	} catch (err) {
		next(err); // Pass the error to the next middleware
	}
};

module.exports = {
	loginUser,
	registerUser
};
