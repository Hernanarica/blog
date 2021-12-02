import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export async function create(comment) {
	return DBConnection(async db => {
		return await db.collection('opinions').insertOne(comment);
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
		const opinions = await db.collection('opinions').find().toArray();
		return opinions.filter(opinion => opinion.public === true);
	});
}