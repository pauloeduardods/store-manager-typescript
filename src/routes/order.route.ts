import express from 'express';
import { create, getById, getAll } from '../controllers/order.controller';

const router = express.Router();

router.post('/', create);

router.get('/', getAll);

router.get('/:id', getById);

export default router;