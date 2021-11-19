import { FindOptions, Op, literal } from 'sequelize';
import CustomError from '../custom-error/CustomError';
import Order from '../database/models/Order';
import { PaginateList } from '../models/base/PaginateList';
import { OrderDetailViewModel } from '../models/viewmodels/OrderDetailViewModel';
import { OrderListViewModel } from '../models/viewmodels/OrderListViewModel';
import { getPaginateOptions } from '../utils/getPaginateOptions';

export class OrderService {
  async list({ page, limit, customerName, customerId }): Promise<PaginateList<OrderListViewModel>> {
    const filterByCustomer = {};

    if (customerId) filterByCustomer['id'] = customerId;
    if (customerName && !customerId) filterByCustomer['name'] = { [Op.iLike]: `%${customerName}%` };

    const findOptions: FindOptions = {
      ...getPaginateOptions(page, limit),
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
          attributes: ['id', 'name'],
          where: filterByCustomer
        }
      ],
      order: [['createdAt', 'DESC']]
    };

    const { count, rows } = await Order.findAndCountAll(findOptions);

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
