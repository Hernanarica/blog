import DBConnection from "./database.js";
import bcrypt from "bcrypt";

export function login(email, password) {
	return DBConnection(async db => {
		const user = await db.collection('users').findOne({ email: email });
		
		if (user) {
			const isValidate = await bcrypt.compare(password, user.password);
			
			if (isValidate) {
				return { ...user, password: null };
			}
			
			throw ({ msg: 'La contraseña es incorrecta' });
		}
		
		throw ({ msg: 'El usuario no existe en el sistema' });
	});
}