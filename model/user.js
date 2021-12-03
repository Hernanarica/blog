import DBConnection from "./database.js";
import bcrypt from 'bcrypt';
import { ObjectId } from "mongodb";

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

export async function remove(id) {
	return DBConnection(async db => {
		return await db.collection('users').deleteOne({ _id: ObjectId(id) });
	});
}

export async function edit(userData) {
	const user = { ...userData };

	return DBConnection(async db => {
		const oldUser = await db.collection('users').findOne({ _id: ObjectId(user.id) });
		user.role     = oldUser.role;

		if (oldUser) {
			return await db.collection('users').replaceOne(
				 {
					 _id: ObjectId(user.id)
				 },
				 {
					 name: user.name,
					 lastname: user.lastname,
					 role: user.role,
					 email: user.email,
					 password: user.password,
				 }
			);
		}

		throw ({ msg: 'El post no fue encontrado' });
	});
}