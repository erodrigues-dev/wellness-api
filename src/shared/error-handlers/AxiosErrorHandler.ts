import { NextFunction, Request, Response } from 'express';

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isAxiosError) {
    return res.status(err.response.status).json({
      message: err.response.statusText,
      errors: err.response.data?.errors
    });
  }

  next(err);
}
