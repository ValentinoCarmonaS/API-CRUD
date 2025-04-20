const mongoose = require('mongoose');
const dbConnect = require('../config/mongo');

beforeAll(async () => {
	// Connect to the database before running tests
	await dbConnect();
});

afterEach(async () => {
	// Clean up the database after each test
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection =
			mongoose.connection.collections[collectionName];
		await collection.deleteMany();
	}
});

afterAll(async () => {
	// Close the connection to the database
	await mongoose.connection.close();
});
