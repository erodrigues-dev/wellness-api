import WorkoutProfile from '../../../database/models/WorkoutProfile';

export class GetWorkoutProfileByCustomerIdUseCase {
  async handle(customerId: number) {
    const model = await this.query(customerId);
    return this.parse(model);
  }

  private query(customerId: number) {
    return WorkoutProfile.findOne({
      where: {
        customerId
      },
      include: {
        association: 'customer',
        attributes: ['id', 'name']
      }
    });
  }

  private parse(model: WorkoutProfile) {
    if (!model) return null;

    return model.toJSON();
  }
}
