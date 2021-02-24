import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

import { ProductSearchUseCase } from '../../use-cases/products';

export const makeProductSearchController = () => {
  const useCase = new ProductSearchUseCase();
  return new ProductSearchController(useCase);
};

const listCategoriesSchema = Joi.object({
  type: Joi.string().valid('activity', 'package').required()
});

export class ProductSearchController {
  constructor(private useCase: ProductSearchUseCase) {}

  async search(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async listCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await listCategoriesSchema.validateAsync(req.query);
      const list = await this.useCase.listCategories(data.type);
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }
}
