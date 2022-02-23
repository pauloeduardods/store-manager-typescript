import { Request, Response, NextFunction } from 'express';
import { create as createUser } from '../services/user';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, level, classe } = req.body;
    const result = await createUser({ username, password, level, classe });
    return res.status(result.code).json(result.data);
  } catch (e) {
    next(e);
  }
};

export function sla():void {

}
