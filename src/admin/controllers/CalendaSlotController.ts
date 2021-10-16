import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { CalendarSlotListUseCase } from '../../shared/useCases/calendar/slots/CalendarSlotListUseCase';
import { CalendarSlotStoreUseCase } from '../../shared/useCases/calendar/slots/CalendarSlotStoreUseCase';

const itemSchema = Joi.object({
  id: Joi.string().uuid().required(),
  start: Joi.string().isoDate().required(),
  end: Joi.string().isoDate().required(),
  recurrenceRule: Joi.string().allow(null, ''),
  recurrenceExceptions: Joi.array().items(Joi.string().isoDate()).allow(null),
  status: Joi.string().required()
});

const schema = Joi.object({
  calendarId: Joi.string().required(),
  created: Joi.array().items(itemSchema),
  updated: Joi.array().items(itemSchema),
  deleted: Joi.array().items(itemSchema)
});

export class CalendarSlotController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { calendarId } = req.params;
      const useCase = new CalendarSlotListUseCase();
      const list = await useCase.list(calendarId);
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { calendarId } = req.params;
      const data = await schema.validateAsync({ calendarId, ...req.body });
      const useCase = new CalendarSlotStoreUseCase();
      await useCase.handle(data);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCalendarSlotController = () => new CalendarSlotController();
