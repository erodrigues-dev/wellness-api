import { Request, Response, NextFunction } from 'express';

export class CalendarEntryController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      return res.sendStatus(200);
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
