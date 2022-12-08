import DBConnection from "./database.js";
import { ObjectId } from "mongodb";

export function getAllComment(fk_post) {
      const db = DBConnection( async (db) => {
         return await db.collection("comments").find({ fk_post: ObjectId(fk_post) }).toArray();
         
      });
}


/**
 * It creates a new comment.
 * @param commentData - The data for the comment to be created.
 */
export async function createComment(commentData) {
   return DBConnection(async db => {
      
      const newComment = {...commentData};
      
      return await db.collection('comments').insertOne(newComment);
   });
}
