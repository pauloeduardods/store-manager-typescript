import { Request, Response, NextFunction } from 'express';
import rescue from 'express-rescue';
import { UserPayload } from '../interfaces/user';

import { create as createOrder } from '../services/order';

export const create = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { id: userId } = req.user as UserPayload;
  const { products } = req.body;
  const response = await createOrder({ products }, userId);
  return res.status(response.code).json(response.data).end();
});

export function sla() {

}