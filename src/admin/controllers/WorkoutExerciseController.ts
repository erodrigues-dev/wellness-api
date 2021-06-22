import { Request, Response, NextFunction } from 'express';
import { Joi } from 'celebrate';

import { CreateWorkoutExerciseUseCase } from '../../shared/useCases/workout/exercise/CreateWorkoutExerciseUseCase';
import { UpdateWorkoutExerciseUseCase } from '../../shared/useCases/workout/exercise/UpdateWorkoutExerciseUseCase';

const createSchema = Joi.object({
  workoutProfileId: Joi.number().required(),
  workoutLogId: Joi.number().required(),
  name: Joi.string().required(),
  notes: Joi.string().allow(null, ''),
  set1Reps: Joi.number(),
  set1Weight: Joi.number(),
  set2Reps: Joi.number(),
  set2Weight: Joi.number(),
  set3Reps: Joi.number(),
  set3Weight: Joi.number(),
  set4Reps: Joi.number(),
  set4Weight: Joi.number()
});

const updateSchema = createSchema.keys({
  id: Joi.number().required()
});

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
