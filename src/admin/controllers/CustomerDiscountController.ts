import { NextFunction, Request, Response } from 'express';

import customerDiscountService from '../../shared/services/CustomerDiscountService';
import ICustomerDiscountService from '../../shared/services/interfaces/ICustomerDiscountService';

export class CustomerDiscountController {
  constructor(private service: ICustomerDiscountService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, relationName, page, limit } = req.query;
      const filter = {
        customerId: Number(customerId),
        relationName: relationName as string,
        page: page,
        limit: limit
      };
      const total = await this.service.count(filter);
      const list = await this.service.list(filter);
      return res.header('X-Total-Count', total.toString()).json(list);
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

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, relationType, relationId } = req.params;
      const discount = await this.service.find(
        Number(customerId),
        String(relationType),
        Number(relationId)
      );
      return res.json(discount);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user;
      const { customerId, type, value, relationType, relationId } = req.body;

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
      const { id: userId } = req.user;
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
