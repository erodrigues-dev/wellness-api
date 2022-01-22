import { Request, Response, NextFunction } from 'express';
import { CalendarEntryListUseCase } from '../../shared/useCases/calendar/entries/CalendarEntryListUseCase';
import { CalendarEntryStoreUseCase } from '../../shared/useCases/calendar/entries/CalendarEntryStoreUseCase';

export class CalendarEntryController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { calendarId } = req.params as any;
      const useCase = new CalendarEntryListUseCase();
      const list = await useCase.handle({ calendarId });
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new CalendarEntryStoreUseCase();
      const id = await useCase.handle({ ...req.params, ...req.body });
      return res.json({ id });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCalendarEntryController = () => new CalendarEntryController();
