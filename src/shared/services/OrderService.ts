import CustomError from '../custom-error/CustomError';
import Activity from '../database/models/Activity';
import CustomerDiscount from '../database/models/CustomerDiscount';
import Order from '../database/models/Order';
import Package from '../database/models/Package';
import PayWithMoneyDTO from '../models/dto/PayWithMoneyDTO';
import IOrder from '../models/entities/IOrder';
import IOrderItem from '../models/entities/IOrderItem';
import { DiscountTypeEnum } from '../models/enums/DiscountTypeEnum';
import { OrderItemTypeEnum } from '../models/enums/OrderItemTypeEnum';
import IOrderService from './interfaces/IOrderService';

export class OrderService implements IOrderService {
  payWithMoney(dto: PayWithMoneyDTO): Promise<void> {
    if (dto.itemType === 'activity') return this.payActivityWithMoney(dto);

    return this.payPackageWithMoney(dto);
  }

  private async payActivityWithMoney(dto: PayWithMoneyDTO) {
    const activity: Activity = await Activity.findByPk(dto.itemId);

    if (!activity) throw new CustomError('Activity Id is invalid.', 400);
    const customerDiscount = await this.getDiscount(
      dto.customerId,
      dto.itemType,
      dto.itemId
    );
    const discount = this.calculateDiscount(
      activity.price,
      customerDiscount?.value,
      customerDiscount?.type
    );

    const order: IOrder = {
      amount: activity.price,
      discount,
      tip: 0,
      userId: dto.userId
    };

    const orderItem: IOrderItem = {
      type: OrderItemTypeEnum.Activity,
      name: activity.name,
      price: activity.price,
      orderId: 0
    };

    const orderPayment = {};
  }

  private async payPackageWithMoney(dto: PayWithMoneyDTO) {}

  private getDiscount(
    customerId: number,
    type: 'activity' | 'package',
    typeId: number
  ): Promise<CustomerDiscount> {
    return CustomerDiscount.findOne({
      where: { relationType: type, relationId: typeId, customerId }
    });
  }

  private calculateDiscount(
    price: number,
    discountValue?: number,
    discountType?: DiscountTypeEnum
  ): number {
    if (!discountValue) return 0;

    if (discountType === DiscountTypeEnum.Amount) return discountValue;

    return (price * discountValue) / 100;
  }
}

export default new OrderService();
