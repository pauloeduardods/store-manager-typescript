import { Request, Response, NextFunction } from 'express';
import rescue from 'express-rescue';
import {
  validateProduct,
  create as createProduct,
  getAll as getAllProducts,
} from '../services/product';

export const validateNewProduct = rescue((req: Request, _res: Response, next: NextFunction) => {
  const { name, amount } = req.body;
  validateProduct({ name, amount });
  next();
});

export const create = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { name, amount } = req.body;
  const response = await createProduct({ name, amount });
  return res.status(response.code).json(response.data).end();
});

export const getAll = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const response = await getAllProducts();
  return res.status(response.code).json(response.data).end();
});