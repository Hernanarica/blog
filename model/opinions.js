import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export async function create(opinion) {
	return DBConnection(async db => {
		return await db.collection('opinions').insertOne(opinion);
	});
}

export async function getAll() {
	return DBConnection(async db => {
		return await db.collection('opinions').find().toArray();
	});
}

export async function remove(id) {
	return DBConnection(async db => {
		return await db.collection('opinions').deleteOne({ _id: ObjectId(id) });
	});
}

export async function published(id) {
	return DBConnection(async db => {
		return await db.collection('opinions').updateOne(
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
		return await db.collection('opinions').find({ public: true }).toArray();
	});
}

export async function getById(id) {
	return DBConnection(async db => {
		return await db.collection('opinions').findOne({ _id: ObjectId(id) });
	});
}

export async function edit(opinionData) {
	const opinion = { ...opinionData };
	
	return DBConnection(async db => {
		const oldOpinion = await db.collection('opinions').findOne({ _id: ObjectId(opinion.id) });
		opinion.public   = oldOpinion.public;
		opinion.created  = oldOpinion.created;
		
		if (oldOpinion) {
			return await db.collection('opinions').replaceOne(
				{
					_id: ObjectId(opinion.id)
				},
				{
					name: opinion.name,
					lastname: opinion.lastname,
					text: opinion.text,
					created: opinion.created,
					public: opinion.public
				}
			);
		}
		
		throw ({ msg: 'La opinión no fue encontrada' });
	});
}