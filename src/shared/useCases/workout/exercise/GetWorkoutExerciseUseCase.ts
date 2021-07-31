import CustomError from '../../../custom-error/CustomError';
import WorkoutExerciseLog from '../../../database/models/WorkoutExerciseLog';

export class GetWorkoutExerciseUseCase {
  async handle(id: number) {
    const model = await WorkoutExerciseLog.findByPk(id);
    if (!model) throw new CustomError('Workout Exercise not found', 404);
    return model.toJSON();
  }
}
