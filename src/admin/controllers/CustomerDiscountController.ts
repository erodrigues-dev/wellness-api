import { NextFunction, Request, Response } from 'express';

import ICustomerDiscountService from '../../shared/services/interfaces/ICustomerDiscountService';
import customerDiscountService from '../../shared/services/CustomerDiscountService';

export class CustomerDiscountController {
  constructor(private service: ICustomerDiscountService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const list = await this.service.list(Number(customerId));
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const { id: userId } = { id: 1 };
      const { type, value, relationType, relationId } = req.body;

      console.log(req.body);

      const model = await this.service.store({
        userId,
        customerId: Number(customerId),
        type,
        value,
        relationType,
        relationId
      });

      return res.status(201).json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = req.params;
      const { id: userId } = { id: 1 };
      const { id, type, value, relationType, relationId } = req.body;

      const model = await this.service.update({
        id: Number(id),
        customerId: Number(customerId),
        userId,
        type,
        value,
        relationType,
        relationId
      });

      return res.status(200).json(model);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, customerId } = req.params;

      await this.service.destroy(Number(id), Number(customerId));

      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerDiscountController(customerDiscountService);
