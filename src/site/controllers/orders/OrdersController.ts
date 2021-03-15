import { NextFunction, Request, Response } from 'express';
import { OrderListUseCase } from '../../use-cases/orders/OrderListUseCase';

export class OrdersController {
  constructor(private useCase: OrderListUseCase) {}

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.useCase.list({
        user_id: req.user.id,
        page: req.body.page,
        limit: req.body.limit
      });
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const model = await this.useCase.get({
        user_id: req.user.id,
        order_id: Number(req.params.id)
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

export const makeOrdersController = () => {
  const useCase = new OrderListUseCase();
  return new OrdersController(useCase);
};
