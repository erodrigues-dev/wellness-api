import { Op, fn } from 'sequelize';

import OrderActivity from '../../../shared/database/models/OrderActivity';
import { PAID_STATUS } from '../../../shared/models/enums';

interface Service {
  id: number;
  title: string;
  category: string;
  image_url: string;
  duration: number;
}

export class MyServicesListUseCase {
  async list(userId: number): Promise<Service[]> {
    const data = await this.query(userId);
    const all_activities = data.map(this.mapToService);
    const group_by_id: { [key: number]: Service } = all_activities.reduce(this.groupById, {});
    return Object.values(group_by_id).sort(this.sortByTitle);
  }

  private groupById(group: any, item: Service) {
    group[item.id] = item;
    return group;
  }

  private sortByTitle(a: Service, b: Service): number {
    const title_a = a.title.toLowerCase();
    const title_b = b.title.toLowerCase();

    if (title_a === title_b) return 0;
    if (title_a > title_b) return 1;
    return -1;
  }

  private mapToService(item: OrderActivity): Service {
    return {
      id: item.activityId,
      title: item.name,
      category: item.category.name,
      image_url: item.activity.imageUrl || null,
      duration: item.duration
    };
  }

  private query(userId: number) {
    return OrderActivity.findAll({
      attributes: ['activityId', 'name', 'duration'],
      include: [
        {
          association: 'activity',
          attributes: ['imageUrl']
        },
        {
          association: 'orderPackage',
          attributes: ['expiration']
        },
        {
          association: 'category',
          attributes: ['name']
        },
        {
          association: 'order',
          attributes: ['customerId'],
          where: {
            customerId: userId,
            paidUntilDate: {
              [Op.or]: [{ [Op.is]: null }, { [Op.gt]: fn('now') }]
            },
            status: { [Op.in]: PAID_STATUS },
            ['$orderPackage.expiration$']: {
              [Op.or]: [{ [Op.is]: null }, { [Op.gt]: fn('now') }]
            }
          }
        }
      ]
    });
  }
}
