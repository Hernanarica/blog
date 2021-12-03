import * as opinions from '../model/opinions.js';
import * as yup from "yup";

let opinionSchema = yup.object({
	name: yup.string().required("El nombre es requerido"),
	lastname: yup.string().required("El apellido es requerido"),
	text: yup.string().required("El texto es requerido")
}).noUnknown();

export function create(req, res) {
	opinionSchema.validate(req.body)
		 .then(opinionValid => {
			 return opinions.create({
				 ...opinionValid,
				 created: new Date().toDateString(),
				 public: false
			 });
		 })
		 .then(() => {
			 res.json({ msg: 'La opinión fue creada con éxito' });
		 }).catch(err => {
		res.status(400).json({ msg: 'Error al crear la opinión', err: err.errors });
	});
}

export function getAll(req, res) {
	opinions.getAll().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: 'Error al traer las opiniones' });
	});
}

export function remove(req, res) {
	opinions.remove(req.params.id).then(r => {
		res.json({ msg: "Opinión eliminada con éxito" });
	}).catch(err => {
		res.status(400).json({ msg: 'Error al borrar la opinión' });
	});
}

export function published(req, res) {
	opinions.published(req.params.id).then(r => {
		res.json({ msg: 'Opinión publicada con éxito' });
	}).catch(err => {
		res.status(400).json({ msg: 'Error al hacer publica la opinión' });
	});
}

export function getById(req, res) {
	const id = req.params.id;

	opinions.getById(id).then(r => {
		res.json(r);
	}).catch(() => {
		res.status(400).json({ msg: 'Error al traer la opinión' });
	});
}

export function getAllPublished(req, res) {
	opinions.getAllPublished().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: 'Error al traer las opiniones publicadas' });
	});
}

export function edit(req, res) {
	opinionSchema.validate(req.body)
		 .then(opinionValid => {
			 return opinions.edit({
				 ...opinionValid,
				 id: req.params.id
			 });
		 })
		 .then(r => {
			 res.json({ msg: 'Opinión editada con éxito' });
		 }).catch(err => {
		res.status(400).json({ msg: err.msg, err: err.errors });
	});
}