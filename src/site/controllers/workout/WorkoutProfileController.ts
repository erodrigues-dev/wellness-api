import { Request, Response, NextFunction } from 'express';
import {
  GetWorkoutProfileByCustomerIdUseCase,
  CreateWorkoutProfileUseCase,
  UpdateWorkoutProfileUseCase,
  createSchema,
  updateSchema
} from '../../../shared/useCases/workout/profile';

export class WorkoutProfileController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: customerId } = req.user;
      const usecase = new GetWorkoutProfileByCustomerIdUseCase();
      const profile = await usecase.handle(customerId);
      return res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: customerId } = req.user;
      const data = await createSchema.validateAsync({
        ...req.body,
        customerId
      });
      const usecase = new CreateWorkoutProfileUseCase();
      const profile = await usecase.handle(data);
      return res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await updateSchema.validateAsync(req.body);
      const usecase = new UpdateWorkoutProfileUseCase();
      const profile = await usecase.handle(data);
      return res.json(profile);
    } catch (error) {
      next(error);
    }
  }
}

export const makeWorkoutProfileController = () => new WorkoutProfileController();
