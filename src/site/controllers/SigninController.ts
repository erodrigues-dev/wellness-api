import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { SigninUseCase } from '../use-cases/SigninUseCase';

export class SigninController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new SigninUseCase();
      const token = await useCase.signin(req.body.email, req.body.password);

      if (!token)
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Email or passward are invalid!' });

      return res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
