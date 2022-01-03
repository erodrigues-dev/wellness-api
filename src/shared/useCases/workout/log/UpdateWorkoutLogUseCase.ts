import CustomError from '../../../custom-error/CustomError';
import WorkoutLog from '../../../database/models/WorkoutLog';
import { updateSchema } from './schema';

interface UpdateWorkoutLogData {
  id: number;
  workoutProfileId: number;
  trainers: number[];
  resume: string;
  notes: string;
  date: string;
}

export class UpdateWorkoutLogUseCase {
  private model: WorkoutLog;

  async handle(data: UpdateWorkoutLogData): Promise<any> {
    await this.validate(data);
    await this.load(data);
    await this.checkIfExist(data);
    await this.update(data);
  }

  private async validate(data: UpdateWorkoutLogData) {
    await updateSchema.validateAsync(data);
  }

  private async load({ id }) {
    this.model = await WorkoutLog.findByPk(id);
  }

  private async checkIfExist({ workoutProfileId }: UpdateWorkoutLogData) {
    if (!this.model) throw new CustomError('Workout log not found');
    if (this.model.workoutProfileId !== workoutProfileId) throw new CustomError('Invalid workout profile id');
  }

  private async update(data: UpdateWorkoutLogData) {
    const transaction = await WorkoutLog.sequelize.transaction();
    try {
      this.model.resume = data.resume;
      this.model.notes = data.notes;
      this.model.date = new Date(data.date);

      await this.model.save({ transaction });
      await this.model.setTrainers(data.trainers, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
