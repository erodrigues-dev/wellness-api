import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { GetDiscountUseCase } from '../../use-cases/checkout/GetDiscountUseCase';

const schema = Joi.object({
  user_id: Joi.number().required(),
  relation_type: Joi.string().required().valid('package', 'activity'),
  relation_id: Joi.number().required()
});

export class GetDiscountController {
  constructor(private useCase: GetDiscountUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await schema.validateAsync({
        user_id: req.user.id,
        ...req.query
      });

      const discount = await this.useCase.get(data);
      return res.json(discount);
    } catch (error) {
      next(error);
    }
  }
}

export const makeGetDiscountController = () => new GetDiscountController(new GetDiscountUseCase());
