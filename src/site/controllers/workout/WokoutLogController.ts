import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  CreateWorkoutLogUseCase,
  UpdateWorkoutLogUseCase,
  ListWorkoutLogUseCase,
  GetWorkoutLogUseCase,
  indexSchema,
  createSchema,
  updateSchema,
  DestroyWorkoutLogUseCase
} from '../../../shared/useCases/workout/log';

export class WorkoutLogController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await indexSchema.validateAsync(req.query);
      const usecase = new ListWorkoutLogUseCase(data);
      const list = await usecase.handle();
      return res.header('x-total-count', String(list.count)).json(list.rows);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as any;
      const usecase = new GetWorkoutLogUseCase();
      const result = await usecase.handle(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.body };
      const usecase = new CreateWorkoutLogUseCase();
      const model = await usecase.handle(data);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await updateSchema.validateAsync({
        ...req.params,
        ...req.body
      });
      const usecase = new UpdateWorkoutLogUseCase();
      await usecase.handle(data);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as any;
      const usecase = new DestroyWorkoutLogUseCase();
      await usecase.handle(id);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWorkoutLogController = () => new WorkoutLogController();
