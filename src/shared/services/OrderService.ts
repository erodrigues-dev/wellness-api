import Order from '../database/models/Order';
import { PaginateList } from '../models/base/PaginateList';
import { OrderListViewModel } from '../models/viewmodels/OrderListViewModel';

export class OrderService {
  async list(
    page = 1,
    limit = 10,
    customerId: number = null
  ): Promise<PaginateList<OrderListViewModel>> {
    const filter = {};
    if (customerId) filter['customerId'] = customerId;
    const { count, rows } = await Order.findAndCountAll({
      include: [
        {
          association: 'items',
          attributes: ['type', 'name', 'recurrency'],
          where: {
            parentId: null
          }
        },
        {
          association: 'user',
          attributes: ['id', 'name']
        },
        {
          association: 'customer',
          attributes: ['id', 'name']
        },
        {
          association: 'payments',
          attributes: ['type', 'status']
        }
      ],
      limit,
      offset: (page - 1) * limit,
      where: filter,
      order: [['createdAt', 'DESC']]
    });

    return {
      rows: rows.map(order => OrderListViewModel.fromOrder(order)),
      count
    };
  }
}

export default new OrderService();
