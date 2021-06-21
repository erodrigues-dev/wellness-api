import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Joi } from 'celebrate';

import { CreateWorkoutProfileUseCase } from '../../shared/useCases/workout/profile/CreateWorkoutProfileUseCase';
import { UpdateWorkoutProfileUseCase } from '../../shared/useCases/workout/profile/UpdateWorkoutProfileUseCase';

const createSchema = Joi.object({
  customerId: Joi.number().required(),
  age: Joi.number(),
  height: Joi.string().allow(null, ''),
  weight: Joi.number(),
  goal: Joi.string().allow(null, ''),
  test1: Joi.string().allow(null, ''),
  test2: Joi.string().allow(null, ''),
  injuriesLimitations: Joi.string().allow(null, ''),
  experienceLevel: Joi.string().allow(null, ''),
  notes: Joi.string().allow(null, '')
});

const updateSchema = Joi.object({
  id: Joi.number().required(),
  age: Joi.number().allow(null),
  height: Joi.string().allow(null, ''),
  weight: Joi.number().allow(null),
  goal: Joi.string().allow(null, ''),
  test1: Joi.string().allow(null, ''),
  test2: Joi.string().allow(null, ''),
  injuriesLimitations: Joi.string().allow(null, ''),
  experienceLevel: Joi.string().allow(null, ''),
  notes: Joi.string().allow(null, '')
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await updateSchema.validateAsync({
        id: req.params.id,
        ...req.body
      });
      const usecase = new UpdateWorkoutProfileUseCase();
      await usecase.handle(data);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWorkoutProfileController = () => new WorkoutProfileController();
