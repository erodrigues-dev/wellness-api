import CustomError from '../../../custom-error/CustomError';
import WorkoutLog from '../../../database/models/WorkoutLog';

export class DestroyWorkoutLogUseCase {
  async handle(id: number) {
    const rowsAffected = await WorkoutLog.destroy({
      where: { id }
    });

    if (rowsAffected === 0) throw new CustomError('Workout log not found', 404);
  }
}
