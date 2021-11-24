import express from 'express';
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import postRouter from "./router/postRouter.js";
import { authToken } from "./middleware/auth.js";
import dotenv from 'dotenv';

import cors from 'cors';

const APP = express();
dotenv.config();

APP.use(express.json());
APP.use(cors());
APP.use('/user', userRouter);
APP.use('/user', authRouter);
APP.use('/user', postRouter);

APP.listen(80, () => {
	console.log('SERVER ON :)');
});