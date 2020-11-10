import { NextFunction, Request, Response } from 'express';

import { CalculateSubtotal } from '../../shared/useCases/order/CalculateSubtotal';

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
}

export default new CheckoutController();
