require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// ALL routes localhost:3000/api/______
app.use('/api', require('./routes/index'));

const server = app.listen(port, () => {
	console.log(`\nServer is running on http://localhost:${port}\n`);
});

dbConnect();

module.exports = { app, server }; // Export the server for testing purposes
