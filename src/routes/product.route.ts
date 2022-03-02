import express from 'express';
import { validateNewProduct, create, getAll } from '../controllers/product.controller';

const router = express.Router();

router.post('/', validateNewProduct, create);

router.get('/', getAll);

export default router;