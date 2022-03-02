import { Request, Response, NextFunction } from 'express';
import rescue from 'express-rescue';
import { IUserPayload } from '../interfaces';

import {
  validateProducts,
  create as createOrder,
  getById as getOrderById,
  getAll as getAllOrders,
} from '../services/order';

export const validateNewOrder = rescue((req: Request, _res: Response, next: NextFunction) => {
  const { products } = req.body;
  validateProducts(products);
  next();
});

export const create = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { id: userId } = req.user as IUserPayload;
  const { products } = req.body;
  const response = await createOrder(products, userId);
  return res.status(response.code).json(response.data).end();
});

export const getById = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const response = await getOrderById(Number(id));
  return res.status(response.code).json(response.data).end();
});

export const getAll = rescue(async (_req: Request, res: Response, _next: NextFunction) => {
  const response = await getAllOrders();
  return res.status(response.code).json(response.data).end();
});