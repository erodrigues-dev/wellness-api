import CustomError from '../../../custom-error/CustomError';
import WorkoutProfile from '../../../database/models/WorkoutProfile';

export class DestroyWorkoutProfileUseCase {
  async handle(id: number) {
    const rows = await WorkoutProfile.destroy({
      where: { id }
    });

    if (rows === 0) throw new CustomError('Workout profile not found', 404);
  }
}
