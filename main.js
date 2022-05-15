import express from 'express';
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import postRouter from "./router/postRouter.js";
import opinionRouter from "./router/opinionRouter.js";
import comentarioRouter from './router/comentarioRouter.js';
import dotenv from 'dotenv';

import cors from 'cors';

const APP = express();
dotenv.config();

APP.use(express.json());
APP.use(cors());
APP.use('/api', userRouter);
APP.use('/api', authRouter);
APP.use('/api', postRouter);
APP.use('/api', opinionRouter);
APP.use('/api', comentarioRouter);

APP.listen(9001, () => {
	console.log('SERVER ON :)');
});