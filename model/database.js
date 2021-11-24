import mongodb from 'mongodb';
import config from '../config.js';

const client = new mongodb.MongoClient(`mongodb://${ config.db.host }:${ config.db.port }`);

async function DBConnection(callback) {
	await client.connect();
	const res = await callback(client.db(config.db.name));
	await client.close();

	return res;
}

export default DBConnection;