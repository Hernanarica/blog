import DBConnection from "./database.js";
import bcrypt from 'bcrypt';

export async function create(userData) {
	return DBConnection(async db => {
		const newUser = { ...userData };

		const oldUser = await db.collection('users').findOne({ email: newUser.email });

		if (!oldUser) {
			const jumps      = await bcrypt.genSalt(10);
			newUser.password = await bcrypt.hash(newUser.password, jumps);
			await db.collection('users').insertOne(newUser);
			return newUser;
		}

		throw ({ msg: 'El usuario ya existe en el sistema' });
	});
}

export async function getAll() {
	return DBConnection(async db => {
		const users = await db.collection('users').find().toArray();

		if (users.length > 0) {
			return users;
		}

		throw({ msg: 'Error al intentar traer los usuarios' });
	});
}