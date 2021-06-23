import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  CreateWorkoutLogUseCase,
  UpdateWorkoutLogUseCase,
  createSchema,
  updateSchema
} from '../../shared/useCases/workout/log';

export class WorkoutLogController {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await createSchema.validateAsync({
        ...req.params,
        ...req.body
      });
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
}

export const makeWorkoutLogController = () => new WorkoutLogController();
