import express from "express";
import * as commentsController from '../controller/commentsController.js';

const commentRouter = express.Router();

commentRouter.route('/api-comments')
	 .get(commentsController.getAll);

commentRouter.route('/api-comment')
	 .post(commentsController.create);

commentRouter.route('/api-comment/:id')
	 .delete(commentsController.remove);

commentRouter.route('/api-comments/:id')
	 .get(commentsController.getById);

export default commentRouter;