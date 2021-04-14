import { NextFunction, Request, Response } from 'express';

export default function (err: any, req: Request, res: Response, next: NextFunction) {
  console.log('>>> ERROR <<<');
  console.error(err);

  next(err);
}
