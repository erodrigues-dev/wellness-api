import CustomError from '../../../custom-error/CustomError';
import WorkoutLog from '../../../database/models/WorkoutLog';
import WorkoutProfile from '../../../database/models/WorkoutProfile';
import { createSchema } from './schema';

interface CreateWorkoutLogData {
  workoutProfileId: number;
  trainers: number[];
  resume: string;
  notes: string;
  date: string;
}

export class CreateWorkoutLogUseCase {
  async handle(data: CreateWorkoutLogData): Promise<any> {
    await this.validate(data);
    await this.checkWorkoutProfileExists(data.workoutProfileId);
    const model = await this.create(data);
    return this.parse(model);
  }

  private async validate(data: CreateWorkoutLogData) {
    await createSchema.validateAsync(data);
  }

  private async checkWorkoutProfileExists(workoutProfileId: number) {
    const profile = await WorkoutProfile.findByPk(workoutProfileId, { attributes: ['id'] });

    if (!profile) throw new CustomError('Workout profile does not exist');
  }

  private async create({ trainers, ...data }: CreateWorkoutLogData) {
    const transaction = await WorkoutLog.sequelize.transaction();
    try {
      const model = await WorkoutLog.create(data, { transaction });
      await model.setTrainers(trainers, { transaction });
      await transaction.commit();
      return model;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
