import { Joi } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { convertToDate } from '../../../shared/utils/date-utils';
import { ListSlotsUseCase } from '../../use-cases/book/ListSlotsUseCase';

const schema = Joi.object({
  activity_id: Joi.number().required(),
  day: Joi.string().isoDate().required()
});

export class ListSlotsController {
  constructor(private useCase: ListSlotsUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await schema.validateAsync(req.query);
      const slots = await this.useCase.handle(Number(data.activity_id), convertToDate(data.day));
      return res.json(slots);
    } catch (error) {
      next(error);
    }
  }
}

export const makeListSlotsController = () => {
  const useCase = new ListSlotsUseCase();
  return new ListSlotsController(useCase);
};
