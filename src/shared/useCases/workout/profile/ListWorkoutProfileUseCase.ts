import { literal, Op } from 'sequelize';

import WorkoutProfile from '../../../database/models/WorkoutProfile';

interface ListWorkoutProfileData {
  page: number;
  limit: number;
  customer: string;
}

export class ListWorkoutProfileUseCase {
  constructor(private data: ListWorkoutProfileData) {}

  async handle() {
    const list = await this.query();
    return {
      count: list.count,
      rows: this.parse(list.rows)
    };
  }

  private async query() {
    return WorkoutProfile.findAndCountAll({
      ...this.getPaginateOptions(),
      ...this.getWhereOptions(),
      include: [
        {
          association: 'customer',
          attributes: ['id', 'name']
        },
        {
          association: 'teamGroup',
          attributes: ['id', 'name']
        }
      ],
      attributes: {
        include: [
          literal(`CASE WHEN "customer_id" IS NOT NULL THEN "customer"."name"
            ELSE "teamGroup".name
            END as "name"
          `) as any
        ]
      },
      order: [literal('"name"')]
    });
  }

  private parse(list: WorkoutProfile[]) {
    return list.map(item => item.toJSON());
  }

  private getPaginateOptions() {
    const { page, limit } = this.data;

    if (page && limit) {
      return {
        limit,
        offset: (page - 1) * limit
      };
    }

    return {};
  }

  private getWhereOptions() {
    const { customer } = this.data;
    if (customer) {
      return {
        where: {
          ['$customer.name$']: { [Op.iLike]: `%${customer}%` }
        }
      };
    }

    return {};
  }
}
