import express from "express";
import * as postController from '../controller/postController.js';

const postRouter = express.Router();

postRouter.route('/posts')
	.get(postController.getAll);

postRouter.route('/posts/published')
	.get(postController.getAllPublished);

postRouter.route('/post/create')
	.post(postController.create);

postRouter.route('/post/:id')
	.get(postController.getById)
	.delete(postController.remove)
	.patch(postController.published)
	.put(postController.edit);

export default postRouter;