import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CalculateSubtotal } from '../../shared/useCases/order/CalculateSubtotal';
import CreateOrderDTO from '../../shared/useCases/order/CreateOrderDTO';
import CreateOrderWithCardDTO from '../../shared/useCases/order/CreateOrderWithCardDTO';
import PayWithCard from '../../shared/useCases/order/PayWithCard';
import PayWithMoney from '../../shared/useCases/order/PayWithMoney';

export class CheckoutController {
  async calculateDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, itemType, itemId } = req.body;

      const subtotal = await new CalculateSubtotal(
        customerId,
        itemType,
        itemId
      ).calculate();

      return res.json(subtotal);
    } catch (error) {
      next(error);
    }
  }

  async cards(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async payWithMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const data = new CreateOrderDTO()
        .parseFromBody(req.body)
        .withUserId(req.user.id);

      await new PayWithMoney().pay(data);

      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }

  async payWithCard(req: Request, res: Response, next: NextFunction) {
    try {
      const data = new CreateOrderWithCardDTO()
        .parseFromBody(req.body)
        .withUserId(req.user.id);

      await new PayWithCard().pay(data);

      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new CheckoutController();
