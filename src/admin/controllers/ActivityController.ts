import { Request, Response, NextFunction } from 'express';
import activityService, { ActivityService } from '../../shared/services/ActivityService';

export class ActivityController {
  constructor(private service: ActivityService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, ...query } = req.query;
      const total = await this.service.count(query);
      const list = await this.service.list(query, Number(page) || null, Number(limit) || null);
      return res.header('X-Total-Count', total.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const model = await this.service.get(Number(id));
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const imageUrl = (req.file as any)?.url;
      const model = await this.service.create({
        ...req.body,
        imageUrl
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const imageUrl = (req.file as any)?.url;
      const model = await this.service.update({
        ...req.body,
        imageUrl
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

const controller = new ActivityController(activityService);

export default controller;
