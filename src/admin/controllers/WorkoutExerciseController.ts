import { Request, Response, NextFunction } from 'express';

import {
  CreateWorkoutExerciseUseCase,
  UpdateWorkoutExerciseUseCase,
  createSchema,
  updateSchema
} from '../../shared/useCases/workout/exercise';

export class WorkoutExerciseController {
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
