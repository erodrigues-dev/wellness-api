import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { OrderBuilder } from '../../shared/builders/OrderBuilder';

export class OrderController {
  constructor() {}

  async payWithMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const builder = new OrderBuilder()
        .withCustomer(Number(req.body.customerId))
        .withItem(req.body.itemType, Number(req.body.itemId))
        .withQuantity(Number(req.body.quantity))
        .withUser(req.user.id);

      await builder.build();
      await builder.payWithMoney();
      await builder.save();

      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
