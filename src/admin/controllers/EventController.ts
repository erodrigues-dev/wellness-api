import { parseISO } from 'date-fns';
import { NextFunction, Request, Response } from 'express';

import eventService from '../../shared/services/EventService';
import IEventService from '../../shared/services/interfaces/IEventService';
import { ListDaysUseCase } from '../../shared/useCases/schedule/ListDaysUseCase';
import { ListTimesUseCase } from '../../shared/useCases/schedule/ListTimesUseCase';
import IEventController, {
    IDeleteRequest, IIndexRequest, IStoreRequest, IUpdateRequest
} from './interfaces/IEventController';

export class EventController implements IEventController {
  constructor(private service: IEventService) {}

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
        parseISO(req.query.start as string),
        parseISO(req.query.end as string)
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
        parseISO(req.params.day)
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

export default new EventController(eventService);
