import Order from '../database/models/Order';
import { PaginateList } from '../models/base/PaginateList';
import { OrderListViewModel } from '../models/viewmodels/OrderListViewModel';

export class OrderService {
  async list(
    customerId: number,
    page = 1,
    limit = 10
  ): Promise<PaginateList<OrderListViewModel>> {
    const { count, rows } = await Order.findAndCountAll({
      include: [
        {
          association: 'items',
          attributes: ['type', 'name', 'recurrency'],
          where: {
            parentId: null
          }
        },
        //TODO payment status is hard coded
        // {
        //   association: 'payments',
        //   limit: 1
        // },
        {
          association: 'user',
          attributes: ['id', 'name']
        }
      ],
      limit,
      offset: (page - 1) * limit,
      where: {
        customerId: customerId ?? undefined
      }
    });

    return {
      rows: rows.map(order => OrderListViewModel.fromOrder(order)),
      count
    };
  }
}

export default new OrderService();
