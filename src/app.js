require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const { swaggerUi, specs } = require('../swagger/swagger');
const app = express();

app.use(cors({
	origin: process.env.DEPLOYMENT_URL,
	credentials: true
}));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.PORT || 3000;

app.use('/api', require('./routes/index'));

// Middleware to handle 404 errors
app.use((req, res, next) => {
	res.status(404).json({
		success: false,
		message: 'Route not found',
		error: new Error('Route not found').message
	});
});

// Middleware to handle errors
app.use((err, req, res, next) => {
	if (err) {
		res.status(err.status || 500).json({
			success: false,
			message: 'Internal Server Error',
			error: err.message
		});
	} else {
		next();
	}
});

const server = app.listen(port);

dbConnect();

module.exports = { app, server }; // Export the server for testing purposes
