import express from "express";
import * as commentController from '../controller/commentController.js'

const commentRouter = express.Router();

commentRouter.route('/comment/get-all/')
    .get(commentController.getAllComment);

commentRouter.route('/comment/create-comment/')
    .post(commentController.createComment)

//editar el comentario del usuario
commentRouter.route('/comment/edit-comment/:id')
      .put(commentController.editComment)

//eliminar el comentario del usuario
commentRouter.route('/comment/delete-comment/:id')
      .delete(commentController.deleteComment)

export default commentRouter;

