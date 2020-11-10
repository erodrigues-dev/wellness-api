import { NextFunction, Request, Response } from 'express';

import IOrderService from '../../shared/services/interfaces/IOrderService';
import orderService from '../../shared/services/OrderService';

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
}

export default new OrderController(orderService);
