import express from "express";
import * as opinionsController from '../controller/opinionsController.js';

const opinionRouter = express.Router();

//api tendria que ser independiente de todo "api/lo que sea"
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

//los post tendrian que ser de cada usuario api/user/post