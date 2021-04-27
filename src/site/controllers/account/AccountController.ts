import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AccountUseCase } from '../../use-cases/account/AccountUseCase';
import { GenerateReferralCodeUseCase } from '../../use-cases/account/GenerateReferralcodeUseCase';

const saveSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  verification_code: Joi.string().allow('', null),
  password: Joi.string().allow('', null),
  confirm_password: Joi.string()
    .when('password', {
      is: password => Boolean(password),
      then: Joi.string().required().valid(Joi.ref('password'))
    })
    .messages({
      'any.only': '"confirm password" must be match with "password"'
    })
});

const createCardSchema = Joi.object({
  card_nonce: Joi.string().required()
});

export class AccountController {
  constructor(private accountUseCase: AccountUseCase, private generateReferralUseCase: GenerateReferralCodeUseCase) {}

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.accountUseCase.get(req.user.id);
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
      const user = await this.accountUseCase.save(data);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async changeImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const image_url = (req.file as any)?.url;
      await this.accountUseCase.changeImage(id, image_url);
      return res.json({ image_url });
    } catch (error) {
      next(error);
    }
  }

  async cards(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('> list cards');
      const { id } = req.user;
      const cards = await this.accountUseCase.listCards(id);
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  }

  async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { card_nonce } = await createCardSchema.validateAsync(req.body);
      const card = await this.accountUseCase.createCard(id, card_nonce);
      return res.json(card);
    } catch (error) {
      next(error);
    }
  }

  async deleteCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { card_id } = req.params;
      await this.accountUseCase.deleteCard(id, card_id);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async generateReferralCode(req: Request, res: Response, next: NextFunction) {
    try {
      const code = await this.generateReferralUseCase.generate(req.user.id);
      return res.json({ code });
    } catch (error) {
      next(error);
    }
  }
}

export const makeAccountController = () => {
  const accountUseCase = new AccountUseCase();
  const generetaReferralUseCase = new GenerateReferralCodeUseCase();
  return new AccountController(accountUseCase, generetaReferralUseCase);
};
