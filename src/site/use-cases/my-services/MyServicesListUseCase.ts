import { Op, fn, literal } from 'sequelize';

import Order from '../../../shared/database/models/Order';
import OrderActivity from '../../../shared/database/models/OrderActivity';
import { PAID_STATUS } from '../../../shared/models/enums';

export class MyServicesListUseCase {
  async list(userId: number) {
    const data = await OrderActivity.findAll({
      attributes: ['id', 'activityId', 'name', 'duration'],
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

    const all_activities = data.map(item => ({
      order_activity_id: item.id,
      id: item.activityId,
      title: item.name,
      category: item.category.name,
      image_url: item.activity.imageUrl,
      duration: item.duration
    }));

    const group_by_id = all_activities.reduce((group, item) => {
      group[item.id] = item;
      return group;
    }, {});

    return Object.values(group_by_id).sort((a: any, b: any) => {
      const title_a = a.title.toLowerCase();
      const title_b = b.title.toLowerCase();

      if (title_a === title_b) return 0;
      if (title_a > title_b) return 1;
      return -1;
    });
  }
}
