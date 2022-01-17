import WorkoutLog from '../../../database/models/WorkoutLog';
import { getPaginateOptions } from '../../../utils/getPaginateOptions';
import { parseTrainers } from './parseTrainer';

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
      ...getPaginateOptions(page, limit),
      include: [
        {
          association: 'trainers',
          attributes: ['id', 'name']
        }
      ],
      where: { workoutProfileId },
      order: [['date', 'desc']]
    });
  }

  private parse(list: WorkoutLog[]) {
    return list.map(item => {
      const { trainers, ...parsed } = item.toJSON() as any;
      return {
        ...parsed,
        trainers: parseTrainers(trainers)
      };
    });
  }
}
