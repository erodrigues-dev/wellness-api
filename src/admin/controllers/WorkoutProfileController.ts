import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Joi } from 'celebrate';

import { CreateWorkoutProfileUseCase } from '../../shared/useCases/workout/profile/CreateWorkoutProfileUseCase';

const createSchema = Joi.object({
  customerId: Joi.number().required(),
  age: Joi.number(),
  height: Joi.string(),
  weight: Joi.number(),
  goal: Joi.string(),
  test1: Joi.string(),
  test2: Joi.string(),
  injuriesLimitations: Joi.string(),
  experienceLevel: Joi.string(),
  notes: Joi.string()
});

export class WorkoutProfileController {
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
}

export const makeWorkoutProfileController = () => new WorkoutProfileController();
