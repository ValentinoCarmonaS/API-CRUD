require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

/*
 * Here invoke the routes
 */

// ALL localhost:3000/api/______
app.use('/api', require('./routes/index'));

app.listen(port, () => {
	console.log(`\nServer is running on http://localhost:${port}\n`);
});

dbConnect();
