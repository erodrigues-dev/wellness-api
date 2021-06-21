import { Request, Response, NextFunction } from 'express';
import { Joi } from 'celebrate';
import { CreateWorkoutLogUseCase } from '../../shared/useCases/workout/log/CreateWorkoutLogUseCase';
import { UpdateWorkoutLogUseCase } from '../../shared/useCases/workout/log/UpdateWorkoutLogUseCase';
import { StatusCodes } from 'http-status-codes';

const createSchema = Joi.object({
  workoutProfileId: Joi.number().required(),
  resume: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  notes: Joi.string().allow(null, '')
});

const updateSchema = Joi.object({
  id: Joi.number().required(),
  workoutProfileId: Joi.number().required(),
  resume: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  notes: Joi.string().allow(null, '')
});

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
