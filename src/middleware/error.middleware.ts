import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces';
import { StatusCode, messages } from '../utils/errorUtils';

export default function error(err: IError, _req: Request, res: Response, _next: NextFunction) {
  if (err.type) {
    const code = StatusCode[err.type];
    if (code) return res.status(code).send({ error: err.message }).end();
  }
  console.log(err);
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: messages.INTERNAL_SERVER_ERROR,
  });
}