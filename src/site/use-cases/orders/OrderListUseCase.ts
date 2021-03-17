import Order from '../../../shared/database/models/Order';
import { OrderItemTypeEnum } from '../../../shared/models/enums';
import { List } from '../../models/List';

interface OrderListData {
  user_id: number;
  page: number;
  limit: number;
}

interface OrderGetData {
  user_id: number;
  order_id: number;
}

export class OrderListUseCase {
  async list({ user_id, page = 1, limit = 10 }: OrderListData): Promise<List> {
    const orders = await this.queryListOrders(user_id, page, limit);

    return {
      hasNextPage: orders.length > limit,
      rows: orders.slice(0, limit)
    };
  }

  async get({ order_id, user_id }: OrderGetData): Promise<any> {
    const order = await Order.findOne({
      where: {
        id: order_id,
        customerId: user_id
      },
      include: [
        {
          association: 'orderActivities',
          attributes: ['id', 'name', 'description', 'duration', 'packageQuantity'],
          include: [
            {
              association: 'activity',
              attributes: ['imageUrl']
            },
            {
              association: 'category',
              attributes: ['name']
            }
          ]
        },
        {
          association: 'orderPackages',
          include: [
            {
              association: 'package',
              attributes: ['imageUrl']
            },
            {
              association: 'category',
              attributes: ['name']
            }
          ]
        }
      ]
    });

    const isPackage = order.type === OrderItemTypeEnum.Package;
    const values = isPackage ? order.orderPackages[0] : order.orderActivities[0];
    const name = values.name;
    const description = values.description;
    const image_url = isPackage ? values['package'].imageUrl : values['activity'].imageUrl;
    const recurrency = values['recurrencyPay'];
    const package_type = values['type'];
    const package_total = values['total'];
    const expiration_date = values['expiration'];

    const activities = isPackage ? order.orderActivities : [];

    return {
      id: order.id,
      name,
      description,
      image_url,

      type: order.type,
      payment_type: order.paymentType,
      status: order.status,
      paid_until_date: order.paidUntilDate,
      canceled_date: order.canceledDate,
      amount: Number(order.amount),
      discount: Number(order.discount),
      tip: Number(order.tip),
      quantity: Number(order.quantity),

      recurrency,
      package_type,
      package_total,
      expiration_date,

      created_at: order.createdAt,

      activities: activities.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category.name,
        duration: item.duration,
        quantity: item.packageQuantity
      }))
    };
  }

  private async queryListOrders(customerId: number, page: number, limit: number) {
    const orders = await Order.findAll({
      where: { customerId },
      limit: limit + 1,
      offset: (page - 1) * limit,
      include: [
        {
          association: 'orderActivities',
          attributes: ['name'],
          include: [
            {
              association: 'activity',
              attributes: ['imageUrl']
            },
            {
              association: 'category',
              attributes: ['name']
            }
          ]
        },
        {
          association: 'orderPackages',
          attributes: ['name'],
          include: [
            {
              association: 'package',
              attributes: ['imageUrl']
            },
            {
              association: 'category',
              attributes: ['name']
            }
          ]
        }
      ],
      attributes: ['id', 'type', 'status', 'paymentType', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    return orders.map(order => {
      const [orderPackage] = order.orderPackages || [];
      const [orderActivity] = order.orderActivities || [];

      const title = order.type === OrderItemTypeEnum.Package ? orderPackage.name : orderActivity.name;
      const image_url =
        order.type === OrderItemTypeEnum.Package ? orderPackage.package.imageUrl : orderActivity.activity.imageUrl;
      const category =
        order.type === OrderItemTypeEnum.Package ? orderPackage.category.name : orderActivity.category.name;

      return {
        id: order.id,
        title,
        image_url,
        category,
        type: order.type,
        status: order.status,
        payment_type: order.paymentType,
        created_at: order.createdAt
      };
    });
  }
}
