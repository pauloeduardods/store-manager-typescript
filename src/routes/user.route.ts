import express from 'express';
import { validateNewUser, create as createUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/', validateNewUser, createUser);

export default router;