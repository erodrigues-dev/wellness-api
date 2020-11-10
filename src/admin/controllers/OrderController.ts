import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import IOrderService from '../../shared/services/interfaces/IOrderService';
import orderService from '../../shared/services/OrderService';
import { PayWithMoney } from '../../shared/useCases/order/PayWithMoney';
import PayWithMoneyDTO from '../../shared/useCases/order/PayWithMoneyDTO';

export class OrderController {
  constructor(private service: IOrderService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.service.list();
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async payWithMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const data = new PayWithMoneyDTO()
        .makeFromBody(req.body)
        .withUserId(req.user.id);

      await new PayWithMoney().pay(data);

      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController(orderService);
