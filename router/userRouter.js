import express from "express";
import * as userController from '../controller/userController.js';

const router = express.Router();

router.route('/api-userCreate')
	 .post(userController.create);
router.route('/api-usersGetAll')
	 .get(userController.getAll);


export default router;