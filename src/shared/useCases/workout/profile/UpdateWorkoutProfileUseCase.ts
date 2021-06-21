import CustomError from '../../../custom-error/CustomError';
import WorkoutProfile from '../../../database/models/WorkoutProfile';

export interface UpdateWorkoutProfileData {
  id: number;
  age: number;
  height: string;
  weight: number;
  goal: string;
  test1: string;
  test2: string;
  injuriesLimitations: string;
  experienceLevel: string;
  notes: string;
}

export class UpdateWorkoutProfileUseCase {
  async handle({ id, ...data }: UpdateWorkoutProfileData): Promise<void> {
    const profile = await WorkoutProfile.findByPk(id, { attributes: ['id'] });
    if (!profile) throw new CustomError('Workout profile not found', 404);
    await WorkoutProfile.update(data, { where: { id } });
  }
}
