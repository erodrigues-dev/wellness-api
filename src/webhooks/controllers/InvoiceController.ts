import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class InvoiceController {
  receive(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(JSON.stringify(req.body, null, 2));
      return res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}
