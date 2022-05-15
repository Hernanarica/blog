import * as comentarios from '../model/comentarios.js';
import * as yup from "yup";

let comentarioSchema = yup.object({
	name: yup.string().required("El nombre es requerido"),
	text: yup.string().required("El texto es requerido")
}).noUnknown();

export function create(req, res) {
	comentarioSchema.validate(req.body)
		 .then(comentarioValid => {
			 return comentarios.create({
				 ...comentarioValid,
				 created: new Date().toDateString(),
				 public: false
			 });
		 })
		 .then(() => {
			 res.json({ msg: 'El comentario fue creado con éxito' });
		 }).catch(err => {
		res.status(400).json({ msg: 'Error al crear el comentario', err: err.errors });
	});
}

export function getAll(req, res) {
	comentarios.getAll().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: 'Error al traer los comentarios' });
	});
}

export function remove(req, res) {
	comentarios.remove(req.params.id).then(r => {
		res.json({ msg: "Comentario eliminado con éxito" });
	}).catch(err => {
		res.status(400).json({ msg: 'Error al borrar el comentario' });
	});
}

export function published(req, res) {
	comentarios.published(req.params.id).then(r => {
		res.json({ msg: 'Comentario publicado con éxito' });
	}).catch(err => {
		res.status(400).json({ msg: 'Error al hacer público el comentario' });
	});
}

export function getById(req, res) {
	const id = req.params.id;

	comentarios.getById(id).then(r => {
		res.json(r);
	}).catch(() => {
		res.status(400).json({ msg: 'Error al traer el comentario' });
	});
}

export function getAllPublished(req, res) {
	comentarios.getAllPublished().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: 'Error al traer los comentarios publicados' });
	});
}

export function edit(req, res) {
	comentarioSchema.validate(req.body)
		 .then(comentarioValid => {
			 return comentarios.edit({
				 ...comentarioValid,
				 id: req.params.id
			 });
		 })
		 .then(r => {
			 res.json({ msg: 'Comentario editado con éxito' });
		 }).catch(err => {
		res.status(400).json({ msg: err.msg, err: err.errors });
	});
}