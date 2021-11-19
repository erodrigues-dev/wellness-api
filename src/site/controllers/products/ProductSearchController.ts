import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import { ProductSearchUseCase } from '../../use-cases/products';

export const makeProductSearchController = () => {
  const useCase = new ProductSearchUseCase();
  return new ProductSearchController(useCase);
};

const searchSchema = Joi.object({
  term: Joi.string().allow('', null),
  type: Joi.string().valid('activity', 'package'),
  categories: Joi.array().items(Joi.string()),
  page: Joi.number().positive().default(1),
  limit: Joi.number().default(10)
});

export class ProductSearchController {
  constructor(private useCase: ProductSearchUseCase) {}

  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await searchSchema.validateAsync(req.query);
      const list = await this.useCase.search(data);
      return res.json(list);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async listCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.useCase.listCategories();
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }
}
