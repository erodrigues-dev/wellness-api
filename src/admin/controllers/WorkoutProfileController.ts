import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  GetWorkoutProfileUseCase,
  UpdateWorkoutProfileUseCase,
  CreateWorkoutProfileUseCase,
  ListWorkoutProfileUseCase,
  createSchema,
  updateSchema,
  DestroyWorkoutProfileUseCase
} from '../../shared/useCases/workout/profile';

export class WorkoutProfileController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const usecase = new ListWorkoutProfileUseCase(req.query as any);
      const result = await usecase.handle();
      return res.header('x-total-count', String(result.count)).json(result.rows);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as any;
      const usecase = new GetWorkoutProfileUseCase();
      const result = await usecase.handle(id);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await createSchema.validateAsync(req.body);
      const usecase = new CreateWorkoutProfileUseCase();
      await usecase.handle(data);
      return res.sendStatus(StatusCodes.CREATED);
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
      const usecase = new UpdateWorkoutProfileUseCase();
      await usecase.handle(data);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as any;
      const usecase = new DestroyWorkoutProfileUseCase();
      await usecase.handle(id);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWorkoutProfileController = () => new WorkoutProfileController();
