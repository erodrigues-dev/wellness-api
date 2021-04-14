import { Response, NextFunction } from 'express';

import IActivityController, {
  IGetRequest,
  IIndexRequest,
  IStoreRequest,
  IUpdateRequest
} from './interfaces/IActivityController';

import activityService, { ActivityService } from '../../shared/services/ActivityService';

export class ActivityController implements IActivityController {
  constructor(private service: ActivityService) {}

  async index(req: IIndexRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name, employeeId, categoryId, page, limit } = req.query;
      const total = await this.service.count({ name, employeeId, categoryId });
      const list = await this.service.list({ name, employeeId, categoryId }, page, limit);
      return res.header('X-Total-Count', total.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(req: IGetRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const model = await this.service.get(id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: IStoreRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const {
        name,
        description,
        price,
        duration,
        employeeId,
        categoryId,
        maxPeople,
        showInApp = true,
        showInWeb = true
      } = req.body;
      const imageUrl = req.file?.url;
      const model = await this.service.create({
        name,
        description,
        price,
        duration,
        employeeId,
        categoryId,
        imageUrl,
        maxPeople,
        showInApp,
        showInWeb
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req: IUpdateRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const {
        id,
        name,
        description,
        price,
        duration,
        employeeId,
        categoryId,
        maxPeople,
        showInApp,
        showInWeb
      } = req.body;
      const imageUrl = req.file?.url;
      const model = await this.service.update({
        id,
        name,
        description,
        price,
        duration,
        employeeId,
        categoryId,
        imageUrl,
        maxPeople,
        showInApp,
        showInWeb
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

const controller: IActivityController = new ActivityController(activityService);

export default controller;
