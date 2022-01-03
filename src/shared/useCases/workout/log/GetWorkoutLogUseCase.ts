import CustomError from '../../../custom-error/CustomError';
import WorkoutLog from '../../../database/models/WorkoutLog';
import { parseTrainers } from './parseTrainer';

export class GetWorkoutLogUseCase {
  async handle(id: number) {
    const model = await WorkoutLog.findByPk(id, {
      include: {
        association: 'trainers',
        attributes: ['id', 'name']
      }
    });
    if (!model) throw new CustomError('Workout log not found', 404);
    const { trainers, ...parsed } = model.toJSON() as any;
    return {
      ...parsed,
      trainers: parseTrainers(trainers)
    };
  }
}
