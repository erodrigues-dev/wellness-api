import { Request, Response, NextFunction } from 'express';
import { Joi } from 'celebrate';
import { CreateWorkoutLog } from '../../shared/useCases/workout/log/CreateWorkoutLogUseCase';

const createSchema = Joi.object({
  workoutProfileId: Joi.number().required(),
  resume: Joi.string().required(),
  date: Joi.string().isoDate().required(),
  notes: Joi.string().allow(null, '')
});

export class WorkoutLogController {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await createSchema.validateAsync(req.body);
      const usecase = new CreateWorkoutLog();
      const model = await usecase.handle(data);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWorkoutLogController = () => new WorkoutLogController();
