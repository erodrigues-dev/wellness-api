import CustomError from '../../../custom-error/CustomError';
import WorkoutProfile from '../../../database/models/WorkoutProfile';

interface CreateWorkoutProfileData {
  customerId: number;
  age: number;
  height: string;
  weight: number;
  goal: string;
  test1: string;
  test2: string;
  injuriesLimitations: string;
  experienceLevel: string;
  notes: string;
}

export class CreateWorkoutProfileUseCase {
  async handle(data: CreateWorkoutProfileData): Promise<any> {
    await this.checkIfExistProfileForCustomer(data.customerId);
    const { id } = await WorkoutProfile.create(data)

    const created = await WorkoutProfile.findByPk(id, {
      include: {
        association: 'customer',
        attributes: ['id', 'name']
      }
    });

    return created.toJSON();
  }

  private async checkIfExistProfileForCustomer(customerId: number) {
    const count = await WorkoutProfile.count({ where: { customerId } });

    if (count > 0) throw new CustomError('This customer already has a profile');
  }
}
