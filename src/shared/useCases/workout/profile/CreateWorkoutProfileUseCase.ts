import CustomError from '../../../custom-error/CustomError';
import WorkoutProfile from '../../../database/models/WorkoutProfile';
import { createSchema } from './schema';

interface CreateWorkoutProfileData {
  type: 'customer' | 'team-group';
  customerId?: number;
  teamGroupId?: string;
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
    await createSchema.validateAsync(data);
    await this.checkIfExistProfile(data);
    return this.create(data);
  }

  private async create(data: CreateWorkoutProfileData) {
    const { type, ...createData } = data;

    if (type === 'customer') data.teamGroupId = null;
    if (type === 'team-group') data.customerId = null;

    const { id } = await WorkoutProfile.create(data);
    const created = await WorkoutProfile.findByPk(id, {
      include: [
        {
          association: 'customer',
          attributes: ['id', 'name']
        },
        {
          association: 'teamGroup',
          attributes: ['id', 'name']
        }
      ]
    });

    return created.toJSON();
  }

  private async checkIfExistProfile({ type, teamGroupId, customerId }: CreateWorkoutProfileData) {
    if (type === 'customer') await this.checkIfExistProfileForCustomer(customerId);
    if (type === 'team-group') await this.checkIfExistProfileForTeamGroup(teamGroupId);
  }

  private async checkIfExistProfileForTeamGroup(teamGroupId: string) {
    const count = await WorkoutProfile.count({ where: { teamGroupId } });

    if (count > 0) throw new CustomError('This team/group already has a profile');
  }

  private async checkIfExistProfileForCustomer(customerId: number) {
    const count = await WorkoutProfile.count({ where: { customerId } });

    if (count > 0) throw new CustomError('This customer already has a profile');
  }
}
