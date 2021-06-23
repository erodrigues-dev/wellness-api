import CustomError from '../../../custom-error/CustomError';
import WorkoutExerciseLog from '../../../database/models/WorkoutExerciseLog';
import WorkoutLog from '../../../database/models/WorkoutLog';

export interface CreateWorkoutExerciseData {
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
    await this.checkIfWorkoutLog(data);
    const model = await this.create(data);
    return this.parse(model);
  }

  private async checkIfWorkoutLog({ workoutLogId }) {
    const workoutLog = await WorkoutLog.findByPk(workoutLogId, { attributes: ['id', 'workoutProfileId'] });
    if (!workoutLog) throw new CustomError('Workout Log not found');
  }

  private create(data: CreateWorkoutExerciseData) {
    return WorkoutExerciseLog.create(data);
  }

  private parse(model: WorkoutExerciseLog) {
    return model.toJSON();
  }
}
