import express from 'express';
import cors from 'cors';

import ormConnection from './connection/typeorm';

import userRouter from './routes/user.route';
import loginRouter from './routes/login.route';
import productRouter from './routes/product.route';
import orderRouter from './routes/order.route';
import errorMiddleware from './middleware/error.middleware';
import authMiddleware from './middleware/auth.middleware';

ormConnection();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use(authMiddleware);

app.use('/products', productRouter);

app.use('/orders', orderRouter);

app.use(errorMiddleware);

export default app;