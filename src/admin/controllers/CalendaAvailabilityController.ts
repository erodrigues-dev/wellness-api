import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import CustomError from '../../shared/custom-error/CustomError';
import { CalendarAvailabilityService } from '../../shared/services/CalendarAvailabilityService';

const schema = Joi.object({
  calendarId: Joi.number().required(),
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().required(),
  recurrence: Joi.string().allow(null, ''),
  status: Joi.string().required()
});

export class CalendarAvailabilityController {
  private service: CalendarAvailabilityService;

  constructor() {
    this.service = new CalendarAvailabilityService();
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { calendarId } = req.params;
      const list = await this.service.listByCalendar(calendarId);
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const model = await this.service.get(id);
      if (!model) throw new CustomError('Calendar availability not found', 404);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { calendarId } = req.params;
      const data = await schema.validateAsync({ calendarId, ...req.body });
      const id = await this.service.create(data);
      return res.status(StatusCodes.CREATED).json({ id });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, calendarId } = req.params;
      const data = await schema.validateAsync({ calendarId, ...req.body });
      await this.service.update({ id, ...data });
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.destroy(id);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCalendarAvailabilityController = () => new CalendarAvailabilityController();
