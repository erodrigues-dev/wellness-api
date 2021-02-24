import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { ProductDetailUseCase } from '../../use-cases/products/ProductDetailUseCase';

const schema = Joi.object({
  id: Joi.number().required(),
  type: Joi.string().required().valid('activity', 'package')
});

export class ProductDetailController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const params = await schema.validateAsync(req.params);
      const useCase = new ProductDetailUseCase();
      const detail = await useCase.load(params.id, params.type);
      return res.json(detail);
    } catch (error) {
      next(error);
    }
  }
}
