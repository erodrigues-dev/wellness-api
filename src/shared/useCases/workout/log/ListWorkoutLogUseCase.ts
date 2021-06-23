import WorkoutLog from '../../../database/models/WorkoutLog';
import { getPaginateOptions } from '../../../utils/getPaginateOptions';

interface Data {
  page: number;
  limit: number;
  workoutProfileId: number;
}

export class ListWorkoutLogUseCase {
  constructor(private data: Data) {}

  async handle() {
    const list = await this.query();
    return {
      count: list.count,
      rows: this.parse(list.rows)
    };
  }

  private query() {
    const { workoutProfileId, page, limit } = this.data;
    return WorkoutLog.findAndCountAll({
      where: { workoutProfileId },
      ...getPaginateOptions(page, limit)
    });
  }

  private parse(list: WorkoutLog[]) {
    return list.map(item => item.toJSON());
  }
}
