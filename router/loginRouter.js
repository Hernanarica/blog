import express from "express";
import * as userController from '../controller/userController.js';
import { JWTValidar } from "../middleware/tokenMidware.js";


const loginRouter = express.Router();

loginRouter.route('/api-userLogin')
    .post(userController.login);

loginRouter.route('/')
    .get([JWTValidar], userController.getAll);


export default loginRouter;