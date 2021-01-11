import CustomError from '../custom-error/CustomError';
import Customer from '../database/models/Customer';
import Order from '../database/models/Order';
import { PaginateList } from '../models/base/PaginateList';
import { OrderDetailViewModel } from '../models/viewmodels/OrderDetailViewModel';
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

  async get(id: number): Promise<OrderDetailViewModel> {
    const order = await Order.findByPk(id, {
      include: [
        { association: 'customer', attributes: ['id', 'name'] },
        { association: 'user', attributes: ['id', 'name'] },
        {
          association: 'orderPackages',
          attributes: ['name', 'recurrencyPay']
        },
        {
          association: 'orderActivities',
          attributes: ['name']
        }
      ]
    });

    if (!order) throw new CustomError('Order not found', 404);

    return OrderDetailViewModel.fromOrder(order.toJSON() as Order);
  }
}

export default new OrderService();
