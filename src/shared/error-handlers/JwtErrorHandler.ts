import { Request, Response, NextFunction } from 'express';

export default function (err: any, _req: Request, res: Response, next: NextFunction) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: err.message,
      status: 401
    });
  }

  next(err);
}
