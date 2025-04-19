// Description: This file contains the MongoDB connection logic.
const mongoose = require('mongoose');

const dbConnect = async () => {
	if (process.env.NODE_ENV === 'test') {
		// A different DB_URI for testing than for development and production
		const DB_URI = process.env.DB_URI_TEST;
	} else if (process.env.NODE_ENV === 'development') {
		// For the moment, we are using the same DB_URI for development and production
		const DB_URI = process.env.DB_URI;
	} else if (process.env.NODE_ENV === 'production') {
		// For the moment, we are using the same DB_URI for development and production
		const DB_URI = process.env.DB_URI;
	}
	try {
		await mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('\n**** MongoDB Connected ****\n');
	} catch (error) {
		console.log('\n**** MongoDB Connection ERROR ****\n');
	}
};

module.exports = dbConnect;
