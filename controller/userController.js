import * as user from '../model/user.js';

export function create(req, res) {
	user.create({
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password
	}).then(r => {
		res.json({ msg: r });
	}).catch(err => {
		res.status(400).json({ msg: err.msg });
	});
}

export function getAll(req, res) {
	user.getAll().then(r => {
		res.json(r);
	}).catch(err => {
		res.status(400).json({ msg: err.msg });
	});
}