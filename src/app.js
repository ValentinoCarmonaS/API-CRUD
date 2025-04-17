require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const e = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// ALL routes localhost:3000/api/______
app.use('/api', require('./routes/index'));
app.use((err, req, res, next) => {
	if (err) {
		console.error(err.stack); // Log the error stack trace
		res.status(err.status || 500).json({
			success: false,
			message: 'Internal Server Error',
			error: err.message
		});
	} else {
		next();
	}
});

const server = app.listen(port, () => {
	console.log(`\nServer is running on http://localhost:${port}\n`);
});

dbConnect();

module.exports = { app, server }; // Export the server for testing purposes
