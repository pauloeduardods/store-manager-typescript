import { Request, Response, NextFunction } from 'express';
import rescue from 'express-rescue';
import {
  validateNewUser as validateNewUserService,
  create as createService,
  login as loginService,
} from '../services/user';

export const validateNewUser = rescue((req: Request, _res: Response, next: NextFunction) => {
  const { username, password, level, classe } = req.body;
  validateNewUserService({ username, password, level, classe });
  next();
});

export const create = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { username, password, level, classe } = req.body;
  const result = await createService({ username, password, level, classe });
  return res.status(result.code).json(result.data).end();
});

export const login = rescue(async (req: Request, res: Response, _next: NextFunction) => {
  const { username, password } = req.body;
  const result = await loginService({ username, password });
  return res.status(result.code).json(result.data).end();
});
