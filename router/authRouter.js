import express from "express";
import * as authController from "../controller/authController.js";

const authRouter = express.Router();
authRouter.route('/user/auth')
	.post(authController.login);

export default authRouter;