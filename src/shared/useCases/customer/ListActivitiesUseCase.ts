import { fn, Op } from 'sequelize';

import Order from '../../database/models/Order';
import OrderPayment from '../../database/models/OrderPayment';
import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import { PAID_STATUS } from '../../models/enums/PaymentStatusEnum';

export class ActivityViewModel {
  id: number;
  name: string;
}

export class ListActivitiesUseCase {
  constructor(private customerId: number) {}

  async list(): Promise<ActivityViewModel[]> {
    const orders = await Order.findAll({
      attributes: ['id', 'customerId'],
      where: {
        customerId: this.customerId
      },
      include: [
        {
          association: 'items',
          attributes: ['metadataId', 'name'],
          where: {
            type: OrderItemTypeEnum.Activity,
            expiresIn: {
              [Op.or]: [{ [Op.is]: null }, { [Op.gt]: fn('now') }]
            }
          }
        },
        {
          association: 'payments',
          attributes: ['type', 'recurrency', 'status', 'paidUntilDate'],
          where: {
            paidUntilDate: {
              [Op.or]: [{ [Op.is]: null }, { [Op.gt]: fn('now') }]
            },
            status: { [Op.in]: PAID_STATUS }
          }
        }
      ]
    });

    const activities: ActivityViewModel[] = [];

    orders.forEach(order => {
      const paid = order.payments?.length > 0;
      if (paid) {
        order.items.forEach(item => {
          activities.push({
            id: item.metadataId,
            name: item.name
          });
        });
      }
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
