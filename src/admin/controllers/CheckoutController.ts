import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import CreateOrderDTO from '../../shared/useCases/order/CreateOrderDTO';
import CreateOrderWithCardDTO from '../../shared/useCases/order/CreateOrderWithCardDTO';
import { ListCards } from '../../shared/useCases/order/ListCards';
import PayWithCard from '../../shared/useCases/order/PayWithCard';
import PayWithMoney from '../../shared/useCases/order/PayWithMoney';

export class CheckoutController {
  async cards(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const cards = await new ListCards(Number(customerId)).list();
      return res.json(cards);
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

      await new PayWithCard(data).pay();

      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new CheckoutController();
