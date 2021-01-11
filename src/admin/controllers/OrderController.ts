import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import orderService, { OrderService } from '../../shared/services/OrderService';
import { CancelSubscriptionUseCase } from '../../shared/useCases/order/CancelSubscriptionUseCase';

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
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const useCase = new CancelSubscriptionUseCase(Number(id));
      await useCase.cancel();
      return res.sendStatus(StatusCodes.NO_CONTENT);
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
