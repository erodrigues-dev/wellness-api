import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { NotificationService } from '../../shared/services/NotificationService';

export class NotificationController {
  constructor(private service: NotificationService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.list({
        page: Number(req.query.page) || null,
        limit: Number(req.query.limit) || null,
        title: req.query.title
      });

      return res.header('x-total-count', String(result.count)).json(result.rows);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as any;
      const model = await this.service.get(id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.store({
        ...req.body,
        createdById: req.user.id
      });
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.destroy(id);
      return res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as any;
      await this.service.markAsRead({
        notificationId: id,
        employeeId: req.user.id
      });
      return res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.markAllAsRead({
        employeeId: req.user.id
      });
      return res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController(new NotificationService());
