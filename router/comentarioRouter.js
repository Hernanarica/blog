import express from "express";
import * as comentariosController from '../controller/comentariosController.js';

const comentarioRouter = express.Router();

comentarioRouter.route('/comentarios')
	.get(comentariosController.getAll);

comentarioRouter.route('/comentarios/published')
    .get(comentariosController.getAllPublished);

comentarioRouter.route('/comentarios/create')
    .post(comentariosController.create);

comentarioRouter.route('/comentarios/:id')
    .delete(comentariosController.remove)
    .patch(comentariosController.published)
    .get(comentariosController.getById)
    .put(comentariosController.edit);

export default comentarioRouter;