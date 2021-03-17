import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

export default function (err: any, req: Request, res: Response, next: NextFunction) {
  if (isCelebrateError(err)) {
    var validationError = [...err.details.values()][0];
    return res.status(400).json({
      message: validationError.message,
      type: 'ValidationError',
      status: 400
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      message: err.message,
      type: 'ValidationError',
      status: 400
    });
  }

  next(err);
}
