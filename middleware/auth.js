import jwt from "jsonwebtoken";
import config from "../config.js";

export function authToken(req, res, next) {
	const token = req.header('auth-token');

	if (token) {
		try {
			req.user = jwt.verify(token, config.jwt.secret);
			next();
		} catch (e) {
			res.status(400).json({ msg: "El token no es válido :(" });
		}
	} else {
		res.status(400).json({ msg: 'No se envió el token :(' });
	}
}

export function createToken(user) {
	return jwt.sign(user, config.jwt.secret);
}