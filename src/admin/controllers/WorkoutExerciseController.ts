import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  ListWorkoutExerciseUseCase,
  GetWorkoutExerciseUseCase,
  CreateWorkoutExerciseUseCase,
  UpdateWorkoutExerciseUseCase,
  createSchema,
  updateSchema,
  indexSchema
} from '../../shared/useCases/workout/exercise';

export class WorkoutExerciseController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await indexSchema.validateAsync(req.query);
      const usecase = new ListWorkoutExerciseUseCase();
      const list = await usecase.handle(data);
      return res.header('x-total-count', String(list.count)).json(list.rows);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as any;
      const usecase = new GetWorkoutExerciseUseCase();
      const model = await usecase.handle(id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await createSchema.validateAsync({
        ...req.params,
        ...req.body
      });
      const usecase = new CreateWorkoutExerciseUseCase();
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
      const usecase = new UpdateWorkoutExerciseUseCase();
      await usecase.handle(data);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWorkoutExerciseController = () => new WorkoutExerciseController();
