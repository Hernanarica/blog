import express from 'express';
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import postRouter from "./router/postRouter.js";
import opinionRouter from "./router/opinionRouter.js";
import dotenv from 'dotenv';

import cors from 'cors';

const APP = express();
dotenv.config();

APP.use(express.json());
APP.use(cors());
APP.use('/user', userRouter);
APP.use('/user', authRouter);
APP.use('/user', postRouter);
APP.use('/user', opinionRouter);

APP.listen(9001, () => {
	console.log('SERVER ON :)');
});