import { Request, Response, NextFunction, Errback } from 'express';

export default function error(err: Errback, req: Request, res: Response, _next: NextFunction):void {
  res.status(500).json({
    message: 'Internal server error',
    details: err,
  });
}