import { Request, Response, NextFunction } from 'express';

export class OrderController {
  async payWithMoney(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, itemType, itemId } = req.body;
      return res.json({ message: 'not implemented' });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
