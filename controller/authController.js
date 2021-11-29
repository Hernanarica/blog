import * as auth from "../model/auth.js";
import { createToken } from "../middleware/auth.js";

export function login(req, res) {
	auth.login(req.body.email, req.body.password).then(r => {
		const token = createToken(r);
		res.json({ r, token });
	}).catch(err => {
		res.status(400).json({ msg: err });
	});
}