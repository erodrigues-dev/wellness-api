import CustomError from '../../../custom-error/CustomError';
import WorkoutLog from '../../../database/models/WorkoutLog';

export interface UpdateWorkoutLogData {
  id: number;
  workoutProfileId: number;
  resume: string;
  notes: string;
  date: string;
}

export class UpdateWorkoutLogUseCase {
  async handle(data: UpdateWorkoutLogData): Promise<any> {
    await this.checkIfExist(data);
    await this.update(data);
  }

  private async checkIfExist({ id, workoutProfileId }: UpdateWorkoutLogData) {
    const log = await WorkoutLog.findByPk(id, { attributes: ['id', 'workoutProfileId'] });
    if (!log) throw new CustomError('Workout log not found');
    if (log.workoutProfileId !== workoutProfileId) throw new CustomError('Invalid workout profile id');
  }

  private async update({ id, ...data }: UpdateWorkoutLogData) {
    await WorkoutLog.update(data, { where: { id }, fields: ['resume', 'notes', 'date'] });
  }
}
