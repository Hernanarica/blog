import express from "express";
import * as postController from '../controller/postController.js';
import { authToken } from "../middleware/auth.js";


const postRouter = express.Router();

postRouter.route('/api-posts')
	 .get(postController.getAll);

postRouter.route('/api-posts-published')
	 .get(postController.getAllPublished);

postRouter.route('/api-post')
	 .post(postController.create);

postRouter.route('/api-post/:id')
    .get(postController.getById)
	 .delete(postController.remove)
	 .patch(postController.published)
	 .put(postController.edit);

export default postRouter;

//los post tendrian que ser de cada usuario api/user/post