import { Transaction } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Activity from '../database/models/Activity';
import Customer from '../database/models/Customer';
import CustomerDiscount from '../database/models/CustomerDiscount';
import Order from '../database/models/Order';
import OrderItem from '../database/models/OrderItem';
import OrderPayment from '../database/models/OrderPayment';
import Package from '../database/models/Package';
import PayWithMoneyDTO from '../models/dto/PayWithMoneyDTO';
import IOrder from '../models/entities/IOrder';
import IOrderItem from '../models/entities/IOrderItem';
import IOrderPayment from '../models/entities/IOrderPayment';
import { DiscountTypeEnum } from '../models/enums/DiscountTypeEnum';
import { OrderItemTypeEnum } from '../models/enums/OrderItemTypeEnum';
import { PaymentTypeEnum } from '../models/enums/PaymentTypeEnum';
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

    const subtotal = activity.price * (dto.quantity || 1);

    const transaction: Transaction = await Order.sequelize.transaction();

    const orderData: IOrder = {
      customerId: dto.customerId,
      userId: dto.userId,
      subtotal,
      tip: 0,
      discount,
      amount: subtotal - discount
    };

    const orderCreated: IOrder = await Order.create(orderData, { transaction });

    const orderItemData: IOrderItem = {
      orderId: orderCreated.id,
      type: OrderItemTypeEnum.Activity,
      metadataId: dto.itemId,
      name: activity.name,
      price: activity.price,
      quantity: dto.quantity
    };

    const orderPaymentData: IOrderPayment = {
      orderId: orderCreated.id,
      type: PaymentTypeEnum.Money,
      tip: orderData.tip,
      discount: orderData.discount,
      amount: orderData.amount
    };

    await OrderItem.create(orderItemData, { transaction });
    await OrderPayment.create(orderPaymentData, { transaction });
    await transaction.commit();
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
