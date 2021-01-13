import { fn, Op } from 'sequelize';

import Order from '../../database/models/Order';
import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import { PAID_STATUS } from '../../models/enums/PaymentStatusEnum';

export class ActivityViewModel {
  id: number;
  name: string;
  orderActivityId: number;
}

export class ListActivitiesUseCase {
  constructor(private customerId: number) {}

  async list(): Promise<ActivityViewModel[]> {
    const orders = await Order.findAll({
      attributes: ['id', 'customerId'],
      where: {
        customerId: this.customerId,
        paidUntilDate: {
          [Op.or]: [{ [Op.is]: null }, { [Op.gt]: fn('now') }]
        },
        status: { [Op.in]: PAID_STATUS }
      },
      include: [
        {
          association: 'orderActivities',
          attributes: ['id', 'activityId', 'name'],
          include: [
            {
              association: 'orderPackage',
              attributes: ['expiration'],
              required: false,
              where: {
                expiration: {
                  [Op.or]: [{ [Op.is]: null }, { [Op.gt]: fn('now') }]
                }
              }
            }
          ]
        }
      ]
    });

    const activities: ActivityViewModel[] = [];

    orders.forEach(order => {
      order.orderActivities.forEach(item => {
        activities.push({
          id: item.activityId,
          name: item.name,
          orderActivityId: item.id
        });
      });
    });

    return this.removeDuplicates(activities);
  }

  private removeDuplicates(list: ActivityViewModel[]) {
    return list.filter(
      (item, index, array) => array.findIndex(fi => fi.id === item.id) === index
    );
  }
}

/**
 * TODO
 * [x] listar atividades compradas pelo cliente
 * [x] verificar status do pagamento
 * [] verificar a quantidade/plano comprado
 */
