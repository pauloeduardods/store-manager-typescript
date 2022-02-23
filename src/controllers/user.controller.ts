import { Request, Response, NextFunction } from 'express';
import rescue from 'express-rescue';
import { create as createUser } from '../services/user';

export const create = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { username, password, level, classe } = req.body;
  const result = await createUser({ username, password, level, classe });
  return res.status(result.code).json(result.data).end();
});

export function sla():void {

}
