import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateOrderUseCase } from '../../use-cases/checkout/CreateOrderUseCase';

const schema = Joi.object({
  card_id: Joi.string().required(),
  due_date: Joi.string().isoDate().required(),
  quantity: Joi.number().required().min(1),
  tip: Joi.number().min(0.01).allow(null, ''),
  product_id: Joi.number().required(),
  product_type: Joi.string().required().valid('activity', 'package')
});

export class CheckoutController {
  constructor(private useCase: CreateOrderUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await schema.validateAsync(req.body);
      await this.useCase.create({ ...data, user_id: req.user.id });
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCheckoutController = () => new CheckoutController(new CreateOrderUseCase());
