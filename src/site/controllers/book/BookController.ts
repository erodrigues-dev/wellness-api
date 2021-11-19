import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { convertToDate } from '../../../shared/utils/date-utils';
import { BookUseCase } from '../../use-cases/book/BookUseCase';

const schema = Joi.object({
  activity_id: Joi.number().required(),
  slot_id: Joi.number().required(),
  user_id: Joi.number().required(),
  date: Joi.string().isoDate().required()
});

export class BookController {
  constructor(private useCase: BookUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await schema.validateAsync({
        ...req.body,
        user_id: req.user.id
      });
      await this.useCase.handle({ ...data, date: convertToDate(data.date) });
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }
}

export const makeBookController = () => {
  const useCase = new BookUseCase();
  return new BookController(useCase);
};
