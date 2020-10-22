import { NextFunction, Request, Response } from 'express';

import ICustomerDiscountService from '../../shared/services/interfaces/ICustomerDiscountService';
import customerDiscountService from '../../shared/services/CustomerDiscountService';

export class CustomerDiscountController {
  constructor(private service: ICustomerDiscountService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, relationName, page, limit } = req.query;
      const filter = {
        customerId: Number(customerId),
        relationName: relationName as string,
        page: Number(page),
        limit: Number(limit)
      };
      const total = await this.service.count(filter);
      const list = await this.service.list(filter);
      return res.header('x-total-count', total.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const model = await this.service.get(Number(id));
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = { id: 1 };
      const { customerId, type, value, relationType, relationId } = req.body;

      console.log(req.body);

      const id = await this.service.store({
        userId,
        customerId: Number(customerId),
        type,
        value,
        relationType,
        relationId
      });

      return res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = { id: 1 };
      const {
        id,
        customerId,
        type,
        value,
        relationType,
        relationId
      } = req.body;

      const model = await this.service.update({
        id: Number(id),
        customerId: Number(customerId),
        userId,
        type,
        value,
        relationType,
        relationId
      });

      return res.status(204).json(model);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await this.service.destroy(Number(id));

      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomerDiscountController(customerDiscountService);
