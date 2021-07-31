import CustomError from '../../../custom-error/CustomError';
import WorkoutLog from '../../../database/models/WorkoutLog';

export class GetWorkoutLogUseCase {
  async handle(id: number) {
    const model = await WorkoutLog.findByPk(id);
    if (!model) throw new CustomError('Workout log not found', 404);
    return model.toJSON();
  }
}
