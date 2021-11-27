import express from "express";
import * as postController from '../controller/postController.js';

const postRouter = express.Router();

postRouter.route('/api-posts')
	 .get(postController.getAll);

postRouter.route('/api-posts-published')
	 .get(postController.getAllPublished);

postRouter.route('/api-post')
	 .post(postController.create);

postRouter.route('/api-post/:id')
	 .delete(postController.remove)
	 .patch(postController.published)
	 .put(postController.edit);

export default postRouter;