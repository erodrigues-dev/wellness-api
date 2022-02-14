import { Request, Response, NextFunction } from 'express';

import { CalendarService } from '../../shared/services/CalendarService';
import { SchedulerAddItemUseCase } from '../../shared/useCases/scheduler/SchedulerAddItemUseCase';
import { SchedulerGetItemUseCase } from '../../shared/useCases/scheduler/SchedulerGetItemUseCase';
import { SchedulerListItemsUseCase } from '../../shared/useCases/scheduler/SchedulerListItemsUseCase';
import { SchedulerRemoveItemUseCase } from '../../shared/useCases/scheduler/SchedulerRemoveItemUseCase';
import { SchedulerSlotUseCase } from '../../shared/useCases/scheduler/SchedulerSlotsUseCase';
import { SchedulerUpdateItemUseCase } from '../../shared/useCases/scheduler/SchedulerUpdateItemUseCase';

export class SchedulerController {
  async calendars(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new CalendarService();
      const list = await service.listAll();
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async activities(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const service = new CalendarService();
      const result = await service.listActivities(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async slots(req: Request, res: Response, next: NextFunction) {
    try {
      const { calendars } = req.query;
      const usecase = new SchedulerSlotUseCase();
      const list = await usecase.list(calendars);
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async listItems(req: Request, res: Response, next: NextFunction) {
    try {
      const usecase = new SchedulerListItemsUseCase();
      const list = await usecase.list(req.query);
      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const usecase = new SchedulerGetItemUseCase();
      const model = await usecase.handle(id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async addItem(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = new SchedulerAddItemUseCase();
      const model = await useCase.handle(req.body);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.params, ...req.body };
      const usecase = new SchedulerUpdateItemUseCase();
      await usecase.handle(data);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const usecase = new SchedulerRemoveItemUseCase();
      await usecase.handle(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export const makeSchedulerController = () => new SchedulerController();
