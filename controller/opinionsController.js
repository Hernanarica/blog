import * as opinions from '../model/opinions.js';

export function create(req, res) {
	const opinion = {
		text: req.body.text,
		created: new Date().toDateString(),
		public: false
	};

	opinions.create(opinion).then(r => {
		res.json({ msg: 'Opinión creada con éxito' });
	}).catch(err => {
		res.status(400).json({ msg: 'Error al crear la opinión' });
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

export function getAllPublished(req, res) {
	opinions.getAllPublished().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: 'Error al traer las opiniones publicadas' });
	});
}