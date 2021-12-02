import * as auth from "../model/auth.js";
import * as yup from "yup";
import { createToken } from "../middleware/auth.js";

let loginScheme = yup.object({
	email: yup.string().email().required("El email es obligatorio"),
	password: yup.string().required("La contraseña es obligatoria")
}).noUnknown();

export function login(req, res) {
	loginScheme.validate(req.body)
		 .then(loginValid => {
			 return auth.login(loginValid.email, loginValid.password);
		 })
		 .then(r => {
			 const token = createToken(r);
			 res.json({ r, token });
		 }).catch(err => {
		res.status(400).json({ msg: err, err: err.errors });
	});
}