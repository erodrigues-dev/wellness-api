import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';

const schema = Joi.object({
  id: Joi.number().required(),
  type: Joi.string().required().valid('activity', 'package')
});

export class ProductDetailController {
  constructor() {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const objParams = await schema.validateAsync(req.params);
      return res.json(objParams);
    } catch (error) {
      next(error);
    }
  }
}
