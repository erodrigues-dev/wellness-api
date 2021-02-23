import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SigninUseCase } from '../../use-cases';

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const emailSchema = Joi.string().email().required();

export class SigninController {
  useCase: SigninUseCase;

  constructor() {
    this.useCase = new SigninUseCase();
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      await schema.validateAsync({ email, password });
      const token = await this.useCase.signin(email, password);

      if (!token)
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Email or password are invalid!' });

      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  async recoverPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await emailSchema.validateAsync(email);
      await this.useCase.recoverPassword(email);
      return res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}
