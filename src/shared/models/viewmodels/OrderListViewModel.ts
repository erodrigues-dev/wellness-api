import Order from '../../database/models/Order';
import { UserDto } from '../dto/UserDto';
import { OrderItemTypeEnum } from '../enums/OrderItemTypeEnum';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';
import { PaymentTypeEnum } from '../enums/PaymentTypeEnum';

export class OrderListViewModel {
  id: number;
  type: OrderItemTypeEnum;
  name: string;
  subtotal: number;
  discount: number;
  tip: number;
  total: number;
  status: PaymentStatusEnum;
  paymentType: PaymentTypeEnum;
  user?: UserDto;
  customer: UserDto;
  createdAt: Date;

  static fromOrder(order: Order) {
    const viewModel = new OrderListViewModel();
    const customer = order.customer as UserDto;

    const discount = Number(order.discount) || 0;
    const tip = Number(order.tip) || 0;
    const amount = Number(order.amount);

    const [packageObj] = order.orderPackages || [];
    const [activity] = order.orderActivities || [];

    const name =
      order.type === OrderItemTypeEnum.Package
        ? packageObj.name
        : activity.name;

    viewModel.id = order.id;
    viewModel.name = name;
    viewModel.type = order.type;
    viewModel.subtotal = amount;
    viewModel.discount = discount;
    viewModel.tip = tip;
    viewModel.total = amount + tip - discount;
    viewModel.status = order.status;
    viewModel.paymentType = order.paymentType;
    viewModel.customer = customer;
    viewModel.createdAt = order.createdAt;
    viewModel.user = order.user as UserDto;

    return viewModel;
  }
}
