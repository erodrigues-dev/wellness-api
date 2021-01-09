import Order from '../database/models/Order';
import { PaginateList } from '../models/base/PaginateList';
import { OrderListViewModel } from '../models/viewmodels/OrderListViewModel';
import { OrderDetailViewModel } from '../models/viewmodels/OrderDetailViewModel';

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
          association: 'orderActivities',
          attributes: ['name']
        },
        {
          association: 'orderPackages',
          attributes: ['name']
        },
        {
          association: 'user',
          attributes: ['id', 'name']
        },
        {
          association: 'customer',
          attributes: ['id', 'name']
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

  async get(id: number): Promise<Order> {
    const order: Order = await Order.findByPk(id);

    if (!order) return null;

    return order;
  }
}

export default new OrderService();
