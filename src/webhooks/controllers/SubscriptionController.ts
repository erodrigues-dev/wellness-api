import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SubscriptionController {
  async receive(req: Request, res: Response, next: NextFunction) {
    console.log('>>> webhook subscription');
    console.log(JSON.stringify(req.body, null, 2));

    return res.sendStatus(StatusCodes.OK);
  }
}
