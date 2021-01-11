import Order from '../../database/models/Order';
import { UserDto } from '../dto/UserDto';
import { OrderItemTypeEnum, PaymentStatusEnum, PaymentTypeEnum, RecurrencyPayEnum } from '../enums';

export class OrderDetailViewModel {
  id: number;
  customer: UserDto;
  type: OrderItemTypeEnum;
  name: string;
  amount: number;
  discount: number;
  tip: number;
  quantity: number;
  status: PaymentStatusEnum;
  paymentType: PaymentTypeEnum;
  user?: UserDto;
  createdAt: Date;
  recurrency?: RecurrencyPayEnum;

  static fromOrder(order: Order) {
    const viewModel = new OrderDetailViewModel();

    const [packageObj] = order.orderPackages || [];
    const [activity] = order.orderActivities || [];

    const name =
      order.type === OrderItemTypeEnum.Package
        ? packageObj.name
        : activity.name;

    viewModel.id = order.id;
    viewModel.name = name;
    viewModel.type = order.type;
    viewModel.amount = Number(order.amount);
    viewModel.discount = Number(order.discount) || 0;
    viewModel.quantity = Number(order.quantity);
    viewModel.tip = Number(order.tip) || 0;
    viewModel.status = order.status;
    viewModel.paymentType = order.paymentType;
    viewModel.customer = order.customer as UserDto;
    viewModel.createdAt = order.createdAt;
    viewModel.user = order.user as UserDto;

    viewModel.recurrency = packageObj?.recurrencyPay;

    return viewModel;
  }
}
