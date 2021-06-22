import CustomError from '../../../custom-error/CustomError';
import WorkoutExerciseLog from '../../../database/models/WorkoutExerciseLog';
import WorkoutLog from '../../../database/models/WorkoutLog';

export interface CreateWorkoutExerciseData {
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

export class CreateWorkoutExerciseUseCase {
  async handle(data: CreateWorkoutExerciseData) {
    await this.checkIfWorkoutLogExistAndValidateProfileId(data);
    const model = await this.create(data);
    return this.parse(model);
  }

  private async checkIfWorkoutLogExistAndValidateProfileId({ workoutLogId, workoutProfileId }) {
    const workoutLog = await WorkoutLog.findByPk(workoutLogId, { attributes: ['id', 'workoutProfileId'] });
    if (!workoutLog) throw new CustomError('Workout Log not found');
    if (workoutLog.workoutProfileId !== workoutProfileId) throw new CustomError('Workout profile id is invalid');
  }

  private create(data: CreateWorkoutExerciseData) {
    return WorkoutExerciseLog.create(data);
  }

  private parse(model: WorkoutExerciseLog) {
    return {
      id: model.id,
      workoutLogId: model.workoutLogId,
      name: model.name,
      notes: model.notes,
      set1Reps: model.set1Reps,
      set1Weight: model.set1Weight,
      set2Reps: model.set2Reps,
      set2Weight: model.set2Weight,
      set3Reps: model.set3Reps,
      set3Weight: model.set3Weight,
      set4Reps: model.set4Reps,
      set4Weight: model.set4Weight
    };
  }
}
