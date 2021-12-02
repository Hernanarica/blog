import * as user from "../model/user.js";
import * as yup from "yup";

let userScheme = yup.object({
	name: yup.string().required("El nombre es obligatorio"),
	lastname: yup.string().required("El apellido es obligatorio"),
	email: yup.string().email().required("El email es obligatorio"),
	password: yup.string().required("La contraseña es obligatoria")
}).noUnknown();

export function create(req, res) {
	userScheme.validate(req.body)
		 .then(userValid => {
			 return user.create(userValid);
		 })
		 .then(r => {
			 res.json({ msg: r });
		 }).catch(err => {
		res.status(400).json({ msg: err.msg, err: err.errors });
	});
}

export function getAll(req, res) {
	user.getAll().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: err.msg });
	});
}