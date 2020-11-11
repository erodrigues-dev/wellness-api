import Order from '../../database/models/Order';
import OrderItem from '../../database/models/OrderItem';
import { UserDto } from '../dto/UserDto';
import { OrderItemTypeEnum } from '../enums/OrderItemTypeEnum';
import { PaymentStatusEnum } from '../enums/PaymentStatusEnum';

export class OrderListViewModel {
  id: number;
  type: OrderItemTypeEnum;
  name: string;
  subtotal: number;
  discount: number;
  tip: number;
  total: number;
  status: PaymentStatusEnum;
  user: UserDto;
  customer: UserDto;
  createdAt: Date;

  static fromOrder(order: Order) {
    const viewModel = new OrderListViewModel();
    const [item] = (order as any).items as OrderItem[];
    const user = (order as any).user as UserDto;
    const customer = (order as any).customer as UserDto;
    // const [payment] = (order as any).payments as OrderPayment[];

    viewModel.id = order.id;
    viewModel.name = item.name;
    viewModel.type = item.type;
    viewModel.subtotal = Number(order.subtotal);
    viewModel.discount = Number(order.discount);
    viewModel.tip = Number(order.tip);
    viewModel.total = Number(order.total);
    viewModel.user = user;
    viewModel.customer = customer;
    //TODO payment status is hard coded
    viewModel.status = PaymentStatusEnum.PaidWithMoney;
    viewModel.createdAt = order.createdAt;

    return viewModel;
  }
}
