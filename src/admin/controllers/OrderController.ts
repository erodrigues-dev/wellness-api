import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import PayWithMoneyDTO from '../../shared/models/dto/PayWithMoneyDTO';
import IOrderService from '../../shared/services/interfaces/IOrderService';
import orderService from '../../shared/services/OrderService';

export class OrderController {
  constructor(private orderService: IOrderService) {}

  async payWithMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new PayWithMoneyDTO().fromRequest(req.body);
      dto.userId = req.user.id;
      await this.orderService.payWithMoney(dto);
      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController(orderService);
