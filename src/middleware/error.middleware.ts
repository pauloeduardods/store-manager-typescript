import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error';
import { StatusCode, messages } from '../utils/errorUtils';

export default function error(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err.type) {
    const code = StatusCode[err.type];
    if (code) return res.status(code).send({ error: err.message }).end();
  }
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: messages.INTERNAL_SERVER_ERROR,
  });
}