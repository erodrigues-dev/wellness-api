import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class SubscriptionController {
  async receive(req: Request, res: Response, next: NextFunction) {
    return res.sendStatus(StatusCodes.OK);
  }
}
