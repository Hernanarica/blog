import * as post from "../model/post.js";

export function create(req, res) {
	post.create({
		title: req.body.title,
		text: req.body.text,
		created: new Date().toDateString(),
		public: false
	}).then(() => {
		res.json({ msg: 'El post fue creado con éxito' });
	}).catch(() => {
		res.status(400).json({ msg: 'Error al crear el post' });
	});
}

export function getAll(req, res) {
	post.getAll().then(r => {
		res.json({ msg: r });
	}).catch(() => {
		res.status(400).json({ msg: 'Error al traer los posts' });
	});
}

export function getById(req, res) {
   const id = req.params.id;
   
   post.getById(id).then(resp => {
      res.json(resp);
   }).catch(() => {
      res.status(400).json({ msg: 'Error al traer el post' });
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
	post.edit({
		id: req.params.id,
		title: req.body.title,
		text: req.body.text
	}).then(r => {
		res.json({ msg: 'Post editado con éxito' });
	}).catch(err => {
		res.status(400).json({ msg: err.msg });
	});
}