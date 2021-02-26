import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AccountUseCase } from '../../use-cases/account/AccountUseCase';

const saveSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  verification_code: Joi.string().allow('', null),
  password: Joi.string().allow('', null),
  confirm_password: Joi.string()
    .when('password', {
      is: Joi.string().required(),
      then: Joi.string().required().valid(Joi.ref('password'))
    })
    .messages({
      'any.only': '"confirm password" must be match with "password"'
    })
});

export class AccountController {
  constructor(private useCase: AccountUseCase) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.useCase.get(req.user.id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async save(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await saveSchema.validateAsync({
        ...req.body,
        id: req.user.id
      });
      const user = await this.useCase.save(data);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async changeImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const imageUrl = (req.file as any)?.url;
      await this.useCase.changeImage(id, imageUrl);
      return res.json({ imageUrl });
    } catch (error) {
      next(error);
    }
  }

  async cards(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const cards = await this.useCase.cards(id);
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  }
}

export const makeAccountController = () => {
  const useCase = new AccountUseCase();
  return new AccountController(useCase);
};
