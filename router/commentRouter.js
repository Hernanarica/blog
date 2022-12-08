import express from "express";
import * as commentController from '../controller/commentController.js'
import postRouter from "./postRouter.js";

const commentRouter = express.Router();

postRouter.route('/post/:id')
    .post(commentController.createComment)
    .get(commentController.getAllComment);

export default postRouter;

