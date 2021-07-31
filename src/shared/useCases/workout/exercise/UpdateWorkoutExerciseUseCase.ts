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

const fields = [
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
];

export class UpdateWorkoutExerciseUseCase {
  async handle(data: Data) {
    await this.checkIfExist(data);
    await this.update(data);
  }

  private async checkIfExist({ id }) {
    const exerciseLog = await WorkoutExerciseLog.findByPk(id, { attributes: ['id'] });
    if (!exerciseLog) throw new CustomError('Exercise Log not found', 404);
  }

  private async update({ id, ...data }: Data) {
    const exercise = await WorkoutExerciseLog.findByPk(id);

    fields.forEach(field => {
      exercise[field] = data[field] || null;
    });

    await exercise.save();
  }
}
