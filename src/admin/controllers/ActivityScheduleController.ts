import { Response, NextFunction } from 'express';

import IActivityScheduleService from '../../shared/services/interfaces/IActivityScheduleService';
import activityScheduleService from '../../shared/services/ActivityScheduleService';

import IActivityScheduleController, {
  IDeleteRequest,
  IIndexRequest,
  IStoreRequest,
  IUpdateRequest
} from './interfaces/IActivityScheduleController';

export class ActivityScheduleController implements IActivityScheduleController {
  constructor(private service: IActivityScheduleService) {}

  async index(req: IIndexRequest, res: Response, next: NextFunction) {
    try {
      const { start, end, activityId } = req.query;
      const rows = await this.service.list(
        new Date(start),
        new Date(end),
        activityId
      );
      return res.json(rows);
    } catch (error) {
      next(error);
    }
  }

  async store(
    req: IStoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const id = await this.service.create(req.body);
      return res.json({ id });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: IUpdateRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      await this.service.update(req.body);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: IDeleteRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new ActivityScheduleController(activityScheduleService);
