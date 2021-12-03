import express from "express";
import * as userController from '../controller/userController.js';

const userRouter = express.Router();

userRouter.route('/api-user')
	 .post(userController.create);

userRouter.route('/api-users')
	 .get(userController.getAll);

userRouter.route('/api-user/:id')
	 .delete(userController.remove)
	 .patch(userController.edit);

export default userRouter;