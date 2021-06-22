import CustomError from '../../../custom-error/CustomError';
import WorkoutExerciseLog from '../../../database/models/WorkoutExerciseLog';
import WorkoutLog from '../../../database/models/WorkoutLog';

export interface UpdateWorkoutExerciseData {
  id: number;
  workoutProfileId: number;
  workoutLogId: number;
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
  async handle(data: UpdateWorkoutExerciseData) {
    await this.checkIfExist(data.id);
    await this.checkIfWorkoutLogExistAndValidateProfileId(data);
    await this.update(data);
  }

  private async checkIfWorkoutLogExistAndValidateProfileId({ workoutLogId, workoutProfileId }) {
    const workoutLog = await WorkoutLog.findByPk(workoutLogId, { attributes: ['id', 'workoutProfileId'] });
    if (!workoutLog) throw new CustomError('Workout Log not found');
    if (workoutLog.workoutProfileId !== workoutProfileId) throw new CustomError('Workout profile id is invalid');
  }

  private async checkIfExist(id: number) {
    const exerciseLog = await WorkoutExerciseLog.findByPk(id, { attributes: ['id'] });
    if (!exerciseLog) throw new CustomError('Exercise Log not found', 404);
  }

  private update({ id, ...data }: UpdateWorkoutExerciseData) {
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
