import express from "express";
import * as commentController from '../controller/commentController.js'
import { authToken } from "../middleware/auth.js";

const commentRouter = express.Router();

commentRouter.route('/comments/:id_post')
    .get(commentController.getAllComment);

commentRouter.route('/comment/create-comment/')
    .post(authToken, commentController.createComment)

//editar el comentario del usuario
commentRouter.route('/comment/edit-comment/:id')
      .put(commentController.editComment)

//eliminar el comentario del usuario
commentRouter.route('/comment/delete-comment/:id')
      .delete(authToken, commentController.deleteComment)

export default commentRouter;

