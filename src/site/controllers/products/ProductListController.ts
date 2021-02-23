import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { ProductListUseCase } from '../../use-cases/ProductListUseCase';

const listSchema = Joi.object({
  page: Joi.number().positive().default(1),
  limit: Joi.number().positive().default(10)
});

export class ProductListController {
  private readonly useCase: ProductListUseCase;

  constructor() {
    this.useCase = new ProductListUseCase();
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const values = await listSchema.validateAsync(req.query);
      const list = await this.useCase.list(values.page, values.limit);

      return res.json(list);
    } catch (error) {
      next(error);
    }
  }
}
