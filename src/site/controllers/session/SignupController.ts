import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SignupUseCase } from '../../use-cases/user';

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string(),
  code: Joi.string().required(),
  password: Joi.string().required().min(8).max(16),
  referral_code: Joi.string()
});

const codeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required()
});

export class SignupController {
  useCase: SignupUseCase;
  constructor() {
    this.useCase = new SignupUseCase();
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validateAsync(req.body);
      await this.useCase.create(req.body);
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async sendCode(req: Request, res: Response, next: NextFunction) {
    try {
      await codeSchema.validateAsync(req.body);
      await this.useCase.sendCode(req.body);
      return res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}

export const makeSignupController = () => new SignupController();
