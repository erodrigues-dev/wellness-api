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

const createCardSchema = Joi.object({
  card_nonce: Joi.string().required(),
  card_name: Joi.string().required()
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
      const cards = await this.useCase.listCards(id);
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  }

  async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { card_nonce, card_name } = await createCardSchema.validateAsync(req.body);
      const card = await this.useCase.createCard(id, card_nonce, card_name);
      return res.json(card);
    } catch (error) {
      next(error);
    }
  }

  async deleteCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { card_id } = req.params;
      await this.useCase.deleteCard(id, card_id);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export const makeAccountController = () => {
  const useCase = new AccountUseCase();
  return new AccountController(useCase);
};
