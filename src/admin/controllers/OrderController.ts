import { NextFunction, Request, Response } from 'express';

import orderService, { OrderService } from '../../shared/services/OrderService';

export class OrderController {
  constructor(private service: OrderService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, customerId } = this.parseIndexParams(req);

      const data = await this.service.list(page, limit, customerId);
      return res.header('x-total-count', data.count.toString()).json(data.rows);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await this.service.get(Number(id));

      if (!data) return res.status(404).json({ message: 'Order not found' });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  private parseIndexParams(req: Request) {
    return {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      customerId: Number(req.query.customerId) ?? undefined
    };
  }
}

export default new OrderController(orderService);
