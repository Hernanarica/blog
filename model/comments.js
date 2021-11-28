import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export async function create(comment) {
	return DBConnection(async db => {
		return await db.collection('comments').insertOne(comment);
	});
}

export async function getAll() {
	return DBConnection(async db => {
		return await db.collection('comments').find().toArray();
	});
}

export async function remove(id) {
	return DBConnection(async db => {
		return await db.collection('comments').deleteOne({ _id: ObjectId(id) });
	});
}

export async function getById(id) {
	return DBConnection(async db => {
		const comments = await db.collection('comments').find().toArray();
		return comments.filter(comment => parseInt(comment.idPost) === parseInt(ObjectId(id)));
	});
}