import express from "express";
import * as authController from "../controller/authController.js";

const authRouter = express.Router();

authRouter.route('/api-authUser')
	 .post(authController.login);

export default authRouter;