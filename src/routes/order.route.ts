import express from 'express';
import { validateNewOrder, create, getById, getAll } from '../controllers/order.controller';

const router = express.Router();

router.post('/', validateNewOrder, create);

router.get('/', getAll);

router.get('/:id', getById);

export default router;