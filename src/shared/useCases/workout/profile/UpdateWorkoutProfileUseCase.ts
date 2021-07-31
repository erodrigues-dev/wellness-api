import CustomError from '../../../custom-error/CustomError';
import WorkoutProfile from '../../../database/models/WorkoutProfile';

interface UpdateWorkoutProfileData {
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
    const profile = await WorkoutProfile.findByPk(id);
    if (!profile) throw new CustomError('Workout profile not found', 404);

    profile.age = data.age || null;
    profile.height = data.height || null;
    profile.weight = data.weight || null;
    profile.goal = data.goal || null;
    profile.test1 = data.test1 || null;
    profile.test2 = data.test2 || null;
    profile.injuriesLimitations = data.injuriesLimitations || null;
    profile.experienceLevel = data.experienceLevel || null;
    profile.notes = data.notes || null;

    await profile.save();
  }
}
