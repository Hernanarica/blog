import express from 'express';
import router from "./router/userRouter.js";
import cors from 'cors';

const APP = express();

APP.use(express.json());
APP.use(cors());
APP.use('/user', router);

APP.listen(80, () => {
	console.log('SERVER ON :)');
});