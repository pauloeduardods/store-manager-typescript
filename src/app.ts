import express from 'express';
import cors from 'cors';

import userRouter from './routes/user.route';
import loginRouter from './routes/login.route';
import errorMiddleware from './middleware/error.middleware';
import authMiddleware from './middleware/auth.middleware';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use(authMiddleware);

app.use(errorMiddleware);

export default app;
