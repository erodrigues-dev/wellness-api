import CustomError from '../../../custom-error/CustomError';
import WorkoutExerciseLog from '../../../database/models/WorkoutExerciseLog';

export class DestroyWorkoutExerciseUseCase {
  async handle(id: number) {
    const destroyedRows = await WorkoutExerciseLog.destroy({
      where: { id }
    });
    if (destroyedRows === 0) throw new CustomError('Workout Exercise not found', 404);
  }
}
