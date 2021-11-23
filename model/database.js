import mongodb from 'mongodb';

const client = new mongodb.MongoClient('mongodb://localhost:27017');

async function DBConnection(callback) {
	await client.connect();
	const res = await callback(client.db('blog'));
	await client.close();

	return res;
}

export default DBConnection;