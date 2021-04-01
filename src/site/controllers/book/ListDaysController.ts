import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { convertToDate } from '../../../shared/utils/date-utils';
import { ListDaysUseCase } from '../../use-cases/book/ListDaysUseCase';

const schema = Joi.object({
  activity_id: Joi.number().required(),
  reference_date: Joi.string().isoDate().required()
});

export class ListDaysController {
  constructor(private useCase: ListDaysUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await schema.validateAsync(req.query);
      const days = await this.useCase.handle(Number(data.activity_id), convertToDate(data.reference_date));
      return res.json(days);
    } catch (error) {
      next(error);
    }
  }
}

export const makeListDaysController = () => {
  const useCase = new ListDaysUseCase();
  return new ListDaysController(useCase);
};
