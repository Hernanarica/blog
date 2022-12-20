import express from "express";
import * as postController from '../controller/postController.js';
import { authToken } from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.route('/posts')
	.get(postController.getAll);

postRouter.route('/posts/published')
	.get(authToken, postController.getAllPublished);

postRouter.route('/post/create')
	.post(authToken, postController.create);

postRouter.route('/post/:id')
	.get(postController.getById)
	.delete(authToken, postController.remove)
	.patch(authToken, postController.published)
	.put(authToken, postController.edit);

export default postRouter;