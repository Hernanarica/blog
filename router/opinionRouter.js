import express from "express";
import * as opinionsController from '../controller/opinionsController.js';

const opinionRouter = express.Router();

opinionRouter.route('/opinions')
	.get(opinionsController.getAll);

opinionRouter.route('/opinions/published')
	.get(opinionsController.getAllPublished);

opinionRouter.route('/opinion/create')
	.post(opinionsController.create);

opinionRouter.route('/opinion/:id')
	.delete(opinionsController.remove)
	.patch(opinionsController.published)
	.get(opinionsController.getById)
	.put(opinionsController.edit);

export default opinionRouter;