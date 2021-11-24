import express from "express";
import * as postController from '../controller/postController.js';

const postRouter = express.Router();

postRouter.route('/api-postsGetAll')
	 .get(postController.getAll);

postRouter.route('/api-postCreate')
	 .post(postController.create);

postRouter.route('/api-postRemove/:id')
	 .delete(postController.remove);

export default postRouter;