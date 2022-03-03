import { Request, Response, NextFunction } from 'express';
import { Joi } from 'celebrate';

import { CalendarLabelService } from '../../shared/services/CalendarLabelService';

export class CalendarLabelController {
  service: CalendarLabelService;
  schemas = {
    store: Joi.object({
      name: Joi.string().max(100).required(),
      color: Joi.string().max(9).required()
    }),
    update: Joi.object({
      id: Joi.string().uuid().required(),
      name: Joi.string().max(100).required(),
      color: Joi.string().max(7).required()
    })
  };

  constructor() {
    this.service = new CalendarLabelService();
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await this.service.list();
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.schemas.store.validateAsync(req.body);
      const model = await this.service.store(data);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.schemas.update.validateAsync({ ...req.params, ...req.body })
      const model = await this.service.update(data)
      return res.json(model)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.destroy(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export const makeCalendarLabelController = () => new CalendarLabelController();
