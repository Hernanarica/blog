import dotenv from "dotenv";

dotenv.config();

export default {
	db: {
		host: process.env.MONGO_HOST || 'localhost',
		port: process.env.MONGO_PORT || '27017',
		name: process.env.MONGO_NAME || 'blog'
	},
	jwt: {
		secret: process.env.JWT_SECRET_PASSWORD || 'hola-mundo'
	}
};