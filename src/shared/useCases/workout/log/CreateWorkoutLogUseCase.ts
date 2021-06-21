import CustomError from '../../../custom-error/CustomError';
import WorkoutLog from '../../../database/models/WorkoutLog';
import WorkoutProfile from '../../../database/models/WorkoutProfile';

export interface CreateWorkoutLogData {
  workoutProfileId: number;
  resume: string;
  notes: string;
  date: string;
}

export class CreateWorkoutLogUseCase {
  async handle(data: CreateWorkoutLogData): Promise<any> {
    await this.checkWorkoutProfileExists(data.workoutProfileId);
    const model = await this.create(data);
    return this.parse(model);
  }

  private async checkWorkoutProfileExists(workoutProfileId: number) {
    const profile = await WorkoutProfile.findByPk(workoutProfileId, { attributes: ['id'] });

    if (!profile) throw new CustomError('Workout profile does not exist');
  }

  private create(data: CreateWorkoutLogData) {
    return WorkoutLog.create(data);
  }

  private parse(model: WorkoutLog) {
    return {
      id: model.id,
      resume: model.resume,
      date: model.date,
      notes: model.notes
    };
  }
}
