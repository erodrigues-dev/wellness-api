import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SignupUseCase } from '../use-cases';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string(),
  code: Joi.string().required(),
  password: Joi.string().required().min(8).max(16)
});

export class SignupController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validateAsync(req.body);
      await new SignupUseCase().create(req.body);
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }
}
