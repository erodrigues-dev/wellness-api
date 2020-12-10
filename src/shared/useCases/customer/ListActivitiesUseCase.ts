import Order from '../../database/models/Order';
import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';

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
            type: OrderItemTypeEnum.Activity
          }
        },
        {}
      ]
    });

    const activities: ActivityViewModel[] = [];

    orders.forEach(order => {
      order.items.forEach(item => {
        activities.push({
          id: item.metadataId,
          name: item.name
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
 * [] verificar status do pagamento
 * [] verificar a quantidade/plano comprado
 */
