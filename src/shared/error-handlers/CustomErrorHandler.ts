import { NextFunction, Request, Response } from 'express';

import CustomError from '../custom-error/CustomError';

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  next(err);
}
