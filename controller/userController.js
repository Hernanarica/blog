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
			 return user.create({
				 ...userValid,
				 role: req.body.role
			 });
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

export function remove(req, res) {
	const id = req.params.id;

	user.remove(id).then(() => {
		res.json({ msg: 'El usuario fue eliminado con éxito' });
	}).catch(() => {
		res.status(400).json({ msg: 'Error al eliminar al usuario' });
	});
}

export function edit(req, res) {
	userScheme.validate(req.body)
		 .then(userValid => {
			 return user.edit({
				 ...userValid,
				 id: req.params.id
			 });
		 })
		 .then(r => {
			 res.json({ msg: 'Usuario editado con éxito' });
		 }).catch(err => {
		res.status(400).json({ msg: err.msg, err: err.errors });
	});
}

export function getById(req, res) {
	const id = req.params.id;

	user.getById(id).then(r => {
		res.json(r);
	}).catch(() => {
		res.status(400).json({ msg: 'Error al traer el usuario' });
	});
}