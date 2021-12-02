import * as post from "../model/post.js";
import * as yup from "yup";

let postSchema = yup.object({
	title: yup.string().required("El título es requerido"),
	text: yup.string().required("El texto es requerido")
}).noUnknown();

export function create(req, res) {
	postSchema.validate(req.body)
		 .then(postValid => {
			 return post.create({
				 ...postValid,
				 created: new Date().toDateString(),
				 public: false
			 });
		 })
		 .then(() => {
			 res.json({ msg: 'El post fue creado con éxito' });
		 }).catch(err => {
		res.status(400).json({ msg: 'Error al crear el post', err: err.errors });
	});
}

export function getAll(req, res) {
	post.getAll().then(r => {
		res.json({ msg: r });
	}).catch(() => {
		res.status(400).json({ msg: 'Error al traer los posts' });
	});
}

export function getAllPublished(req, res) {
	post.getAllPublished().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: 'Error al traer los post publicados' });
	});
}

export function remove(req, res) {
	const id = req.params.id;

	post.remove(id).then(() => {
		res.json({ msg: 'El post fue eliminado con éxito' });
	}).catch(() => {
		res.status(400).json({ msg: 'Error al eliminar el post' });
	});
}

export function published(req, res) {
	post.published(req.params.id).then(r => {
		res.json({ msg: 'Post publicado con éxito' });
	}).catch(err => {
		res.status(400).json({ msg: 'Error al hacer publico el post' });
	});
}

export function edit(req, res) {
	postSchema.validate(req.body)
		 .then(postValid => {
			 return post.edit({
				 ...postValid,
				 id: req.params.id
			 });
		 })
		 .then(r => {
			 res.json({ msg: 'Post editado con éxito' });
		 }).catch(err => {
		res.status(400).json({ msg: err.msg, err: err.errors });
	});
}