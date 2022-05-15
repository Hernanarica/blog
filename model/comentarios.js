import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export async function create(comentario) {
	return DBConnection(async db => {
		return await db.collection('comentarios').insertOne(comentario);
	});
}

export async function getAll() {
	return DBConnection(async db => {
		return await db.collection('comentarios').find().toArray();
	});
}

export async function remove(id) {
	return DBConnection(async db => {
		return await db.collection('comentarios').deleteOne({ _id: ObjectId(id) });
	});
}

export async function published(id) {
	return DBConnection(async db => {
		return await db.collection('comentarios').updateOne(
			{
				_id: ObjectId(id)
			},
			{
				$set: {
					public: true
				}
			}
		);
	});
}

export async function getAllPublished() {
	return DBConnection(async db => {
		return await db.collection('comentarios').find({ public: true }).toArray();
	});
}

export async function getById(id) {
	return DBConnection(async db => {
		return await db.collection('comentarios').findOne({ _id: ObjectId(id) });
	});
}

export async function edit(comentarioData) {
	const comentario = { ...comentarioData };
	
	return DBConnection(async db => {
		const oldComentario = await db.collection('comentarios').findOne({ _id: ObjectId(comentario.id) });
		comentario.public   = oldComentario.public;
		comentario.created  = oldComentario.created;
		
		if (oldComentario) {
			return await db.collection('comentarios').replaceOne(
				{
					_id: ObjectId(comentario.id)
				},
				{
					name: comentario.name,
					text: comentario.text,
					created: comentario.created,
					public: comentario.public
				}
			);
		}
		
		throw ({ msg: 'El comentario no fue encontrado' });
	});
}