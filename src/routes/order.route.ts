import express from 'express';
import { create, getById } from '../controllers/order.controller';

const router = express.Router();

router.post('/', create);

router.get('/:id', getById);

export default router;