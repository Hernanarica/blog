import express from "express";
import * as opinionsController from '../controller/opinionsController.js';

const opinionRouter = express.Router();

opinionRouter.route('/api-opinions')
	 .get(opinionsController.getAll);

opinionRouter.route('/api-opinions-published')
	 .get(opinionsController.getAllPublished);

opinionRouter.route('/api-opinion')
	 .post(opinionsController.create);

opinionRouter.route('/api-opinion/:id')
	 .delete(opinionsController.remove)
	 .patch(opinionsController.published)
	 .get(opinionsController.getById)
	 .put(opinionsController.edit);

export default opinionRouter;