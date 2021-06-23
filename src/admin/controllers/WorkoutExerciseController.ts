import { Request, Response, NextFunction } from 'express';

import {
  CreateWorkoutExerciseUseCase,
  UpdateWorkoutExerciseUseCase,
  createSchema,
  updateSchema,
  indexSchema,
  ListWorkoutExerciseUseCase
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

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await createSchema.validateAsync({
        ...req.params,
        ...req.body
      });
      const usecase = new CreateWorkoutExerciseUseCase();
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
      const usecase = new UpdateWorkoutExerciseUseCase();
      const model = await usecase.handle(data);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWorkoutExerciseController = () => new WorkoutExerciseController();
