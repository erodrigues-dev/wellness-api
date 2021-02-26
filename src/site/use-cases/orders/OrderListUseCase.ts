import Order from '../../../shared/database/models/Order';
import { OrderItemTypeEnum } from '../../../shared/models/enums';
import { List } from '../../models/List';

interface OrderListData {
  user_id: number;
  page: number;
  limit: number;
}

export class OrderListUseCase {
  async list({ user_id, page = 1, limit = 10 }: OrderListData): Promise<List> {
    const orders = await this.queryListOrders(user_id, page, limit);

    return {
      hasNextPage: orders.length > limit,
      rows: orders.slice(0, limit)
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
      attributes: ['id', 'type', 'status', 'paymentType']
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
        type: order.type,
        status: order.status,
        payment_type: order.paymentType,
        title,
        image_url,
        category
      };
    });
  }
}
