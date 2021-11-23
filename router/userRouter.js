import express from "express";
import * as userController from '../controller/userController.js';

const userRouter = express.Router();

userRouter.route('/api-userCreate')
	 .post(userController.create);
userRouter.route('/api-usersGetAll')
	 .get(userController.getAll);


export default userRouter;