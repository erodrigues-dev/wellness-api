import { Joi } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../../shared/custom-error/CustomError';
import { CalendarService } from '../../shared/services/CalendarService';

const storeSchema = Joi.object({
  name: Joi.string().required(),
  categoryId: Joi.number().required(),
  minHoursToSchedule: Joi.number().required(),
  minHoursToCancel: Joi.number().required(),
  maxDaysInFuture: Joi.number().required(),
  maxEntryPerSlot: Joi.number().required()
});

export class CalendarController {
  service: CalendarService;

  constructor() {
    this.service = new CalendarService();
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.service.list();
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const model = await this.service.get(id);
      if (!model) throw new CustomError('Calendar not found', 404);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await storeSchema.validateAsync(req.body);
      const id = await this.service.create(data);
      return res.status(StatusCodes.CREATED).json({ id });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await storeSchema.validateAsync(req.body);
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
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCalendarController = () => new CalendarController();
