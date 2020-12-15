import { NextFunction, Request, Response } from 'express';

import activityScheduleService from '../../shared/services/ActivityScheduleService';
import IActivityScheduleService from '../../shared/services/interfaces/IActivityScheduleService';
import { ListDaysUseCase } from '../../shared/useCases/schedule/ListDaysUseCase';
import { ListTimesUseCase } from '../../shared/useCases/schedule/ListTimesUseCase';
import IActivityScheduleController, {
    IDeleteRequest, IIndexRequest, IStoreRequest, IUpdateRequest
} from './interfaces/IActivityScheduleController';

export class ActivityScheduleController implements IActivityScheduleController {
  constructor(private service: IActivityScheduleService) {}

  async index(req: IIndexRequest, res: Response, next: NextFunction) {
    try {
      const { id: activityId } = req.params;
      const { start, end } = req.query;
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

  async days(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new ListDaysUseCase(
        Number(req.params.id),
        new Date(req.query.start as any),
        new Date(req.query.end as any)
      );

      const days = await useCase.list();

      return res.json(days);
    } catch (error) {
      next(error);
    }
  }

  async times(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new ListTimesUseCase(
        Number(req.params.id),
        new Date(req.query.date as any)
      );

      const times = await useCase.list();

      return res.json(times);
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
