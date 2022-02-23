import express from 'express';
import cors from 'cors';
import { create as createUser, login } from './controllers/user.controller';
import ErrorMiddleware from './middleware/error.middleware';

const app = express();

app.use(cors());

app.use(express.json());

app.post('/users', createUser);

app.post('/login', login);

app.use(ErrorMiddleware);

export default app;
