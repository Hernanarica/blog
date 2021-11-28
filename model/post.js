import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export async function create(postData) {
	return DBConnection(async db => {
		const newPost = {
			title: postData.title,
			text: postData.text,
			created: postData.created,
			public: postData.public
		};
		
		return await db.collection('posts').insertOne(newPost);
	});
}

export async function getAll() {
	return DBConnection(async db => {
		return await db.collection('posts').find().toArray();
	});
}

export async function getAllPublished() {
	return DBConnection(async db => {
		const posts = await db.collection('posts').find().toArray();
		return posts.filter(post => post.public === true);
	});
}

export async function remove(id) {
	return DBConnection(async db => {
		return await db.collection('posts').deleteOne({ _id: ObjectId(id) });
	});
}

export async function published(id) {
	return DBConnection(async db => {
		return await db.collection('posts').updateOne(
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

export async function edit(postData) {
	const post = {
		id: postData.id,
		title: postData.title,
		text: postData.text
	};
	
	return DBConnection(async db => {
		const oldPost = await db.collection('posts').findOne({ _id: ObjectId(post.id) });
		post.public   = oldPost.public;
		
		if (oldPost) {
			return await db.collection('posts').replaceOne(
				 {
					 _id: ObjectId(post.id)
				 },
				 {
					 title: post.title,
					 text: post.text,
					 public: post.public
				 }
			);
		}
		
		throw ({ msg: 'El post no fue encontrado' });
	});
}