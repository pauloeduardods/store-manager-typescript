import { Request, Response, NextFunction } from 'express';
import rescue from 'express-rescue';
import { create as createProduct } from '../services/product';

export const create = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { name, amount } = req.body;
  const response = await createProduct({ name, amount });
  res.status(response.code).json(response.data);
});

export function sla() {

}
