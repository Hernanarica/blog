import express from "express";
import * as authController from "../controller/authController.js";

const authRouter = express.Router();
//la ruta tendria que ser /api/user
authRouter.route('/api-authUser')
	 .post(authController.login);

export default authRouter;