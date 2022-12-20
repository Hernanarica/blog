import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export async function create(postData) {
	return DBConnection(async db => {
		const newPost = { ...postData };
		
		return await db.collection('posts').insertOne(newPost);
	});
}

export async function getAll() {
	return DBConnection(async db => {
		return await db.collection('posts').find().reverse().toArray();
	});
}

export async function getById(id) {
	return DBConnection(async db => {
		return await db.collection('posts').findOne({ _id: ObjectId(id) });
	});
}

export async function remove(id) {
	return DBConnection(async db => {
		return await db.collection('posts').deleteOne({ _id: ObjectId(id) });
	});
}

export async function edit(postData) {
	const post = { ...postData };
	
	return DBConnection(async db => {
		const oldPost = await db.collection('posts').findOne({ _id: ObjectId(post.id) });
		post.isPublic   = oldPost.isPublic;
		post.created  = oldPost.created;
		
		if (oldPost) {
			return await db.collection('posts').replaceOne(
				{
					_id: ObjectId(post.id)
				},
				{
					title: post.title,
					text: post.text,
					created: post.created,
					isPublic: post.isPublic
				}
			);
		}
		
		throw ({ msg: 'El post no fue encontrado' });
	});
}