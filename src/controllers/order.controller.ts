import { Request, Response, NextFunction } from 'express';
import rescue from 'express-rescue';
import { UserPayload } from '../interfaces/user';

import { create as createOrder, getById as getOrderById } from '../services/order';

export const create = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { id: userId } = req.user as UserPayload;
  const { products } = req.body;
  const response = await createOrder({ products }, userId);
  return res.status(response.code).json(response.data).end();
});

export const getById = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const response = await getOrderById(Number(id));
  return res.status(response.code).json(response.data).end();
});