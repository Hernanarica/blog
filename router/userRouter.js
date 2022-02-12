import express from "express";
import * as userController from '../controller/userController.js';

const userRouter = express.Router();

userRouter.route('/user/create')
	.post(userController.create);

userRouter.route('/user/users')
	.get(userController.getAll);

userRouter.route('/user/:id')
	.delete(userController.remove)
	.patch(userController.edit)
	.get(userController.getById);

export default userRouter;