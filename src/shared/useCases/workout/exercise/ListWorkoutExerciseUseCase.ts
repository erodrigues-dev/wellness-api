import WorkoutExerciseLog from '../../../database/models/WorkoutExerciseLog';
import { getPaginateOptions } from '../../../utils/getPaginateOptions';

interface Data {
  page: number;
  limit: number;
  workoutLogId: number;
}

export class ListWorkoutExerciseUseCase {
  async handle(data: Data) {
    const list = await this.query(data);
    return {
      count: list.count,
      rows: this.parse(list.rows)
    };
  }

  private query({ page, limit, workoutLogId }: Data) {
    return WorkoutExerciseLog.findAndCountAll({
      ...getPaginateOptions(page, limit),
      where: { workoutLogId },
      order: [['createdAt', 'desc']]
    });
  }

  private parse(list: WorkoutExerciseLog[]) {
    return list.map(item => item.toJSON());
  }
}
