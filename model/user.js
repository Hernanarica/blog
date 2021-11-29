import DBConnection from "./database.js";
import bcrypt from 'bcrypt';

export async function create(userData) {
	return DBConnection(async db => {
		const newUser = {
			name: userData.name,
			lastname: userData.lastname,
			email: userData.email,
			password: userData.password
		};

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

export async function login(email, password){
	return DBConnection(async db => {
		const user = await db.collection('users').findOne({ email: email });

		if (user) {
			const validar = await bcrypt.compare(password, user.password)
			if (validar){
				return {...user, password: null};
			}else {
				throw{ msg: 'La contraseña es incorrecta' };
			}

		}

		throw({ msg: 'Error al intentar ingresar al sitio' });
	});
}

export default {
	create,
	getAll,
	login
}