require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, () => {
	console.log(`\nServer is running on http://localhost:${port}\n`);
});

dbConnect();
