import express from 'express';
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import { authToken } from "./middleware/auth.js";
import cors from 'cors';

const APP = express();

APP.use(express.json());
APP.use(cors());
APP.use('/user', [ authToken ], userRouter);
APP.use('/user', authRouter);

APP.listen(80, () => {
	console.log('SERVER ON :)');
});