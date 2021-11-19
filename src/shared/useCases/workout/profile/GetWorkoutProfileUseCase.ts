import CustomError from '../../../custom-error/CustomError';
import WorkoutProfile from '../../../database/models/WorkoutProfile';

export class GetWorkoutProfileUseCase {
  async handle(id: number) {
    const model = await this.query(id);
    if (!model) throw new CustomError('Workout profile not found', 404);
    return this.parse(model);
  }

  private query(id: number) {
    return WorkoutProfile.findByPk(id, {
      include: {
        association: 'customer',
        attributes: ['id', 'name']
      }
    });
  }

  private parse(model: WorkoutProfile) {
    return model.toJSON();
  }
}
