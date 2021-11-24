import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export async function create(postData) {
	return DBConnection(async db => {
		const newPost = {
			title: postData.title,
			text: postData.text
		};

		return await db.collection('posts').insertOne(newPost);
	});
}

export async function getAll() {
	return DBConnection(async db => {
		return await db.collection('posts').find().toArray();
	});
}

export async function remove(id) {
	return DBConnection(async db => {
		return await db.collection('posts').deleteOne({ _id: ObjectId(id) });
	});
}