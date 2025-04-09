// Description: This file contains the MongoDB connection logic.
const mongoose = require('mongoose');

const dbConnect = async () => {
	const DB_URI = process.env.DB_URI;
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
