import { NextFunction, Request, Response } from 'express';
import connection from '../connection/typeorm';

export default async (_req: Request, res: Response, next: NextFunction) => {
  const conn = await connection();
  res.on('end', () => conn.close());
  next();
}; 