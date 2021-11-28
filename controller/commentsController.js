import * as comments from '../model/comments.js';

export function create(req, res) {
	const comment = {
		idPost: req.body.idPost,
		idUser: req.body.idUser,
		text: req.body.text
	};

	comments.create(comment).then(r => {
		res.json({ msg: 'Comentario realizado con éxito' });
	}).catch(err => {
		res.status(400).json({ msg: 'Error al realizar el comentario' });
	});
}

export function getAll(req, res) {
	comments.getAll().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: 'Error al traer lso comentarios' });
	});
}

export function remove(req, res) {
	comments.remove(req.params.id).then(r => {
		res.json({ msg: "Comentario eliminado con éxito" });
	}).catch(err => {
		res.status(400).json({ msg: 'Error al borrar comentario' });
	});
}

export function getById(req, res) {
	comments.getById(req.params.id).then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: 'Error al traer los comentarios' });
	});
}