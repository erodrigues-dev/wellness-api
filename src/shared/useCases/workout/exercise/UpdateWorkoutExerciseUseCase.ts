import CustomError from '../../../custom-error/CustomError';
import WorkoutExerciseLog from '../../../database/models/WorkoutExerciseLog';

interface Data {
  id: number;
  name: string;
  notes: string;
  set1Reps: number;
  set1Weight: number;
  set2Reps: number;
  set2Weight: number;
  set3Reps: number;
  set3Weight: number;
  set4Reps: number;
  set4Weight: number;
}

export class UpdateWorkoutExerciseUseCase {
  async handle(data: Data) {
    await this.checkIfExist(data);
    await this.update(data);
  }

  private async checkIfExist({ id }) {
    const exerciseLog = await WorkoutExerciseLog.findByPk(id, { attributes: ['id'] });
    if (!exerciseLog) throw new CustomError('Exercise Log not found', 404);
  }

  private update({ id, ...data }: Data) {
    return WorkoutExerciseLog.update(data, {
      where: { id },
      fields: [
        'name',
        'notes',
        'set1Reps',
        'set1Weight',
        'set2Reps',
        'set2Weight',
        'set3Reps',
        'set3Weight',
        'set4Reps',
        'set4Weight'
      ]
    });
  }
}
