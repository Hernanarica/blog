import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export function getAll(fk_post) {
   return DBConnection( async db => {
      return await db.collection('comments').find({fk_post: fk_post}).toArray();
   });
}


/**
 * It creates a new comment.
 * @param commentData - The data for the comment to be created.
 */
export async function create(commentData) {
   return DBConnection(async db => {
      
      const newComment = {...commentData};
      
      return await db.collection('comments').insertOne(newComment);
   });
}

export async function edit(id, commentData) {
   return DBConnection(async db => {
      const newComment = {...commentData};
      return await db.collection('comments').updateOne({_id: ObjectId(id)}, {$set: newComment});
   });
}

//eliminar el comentario del usuario
export async function borrar(id) {
   return DBConnection(async db => {
      return await db.collection('comments').deleteOne({_id: ObjectId(id)});
   });
}
