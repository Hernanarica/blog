import * as post from "../model/post.js";

export function create(req, res) {
	post.create({
		title: req.body.title,
		text: req.body.text
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