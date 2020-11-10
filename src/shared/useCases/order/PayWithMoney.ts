import { Transaction } from 'sequelize';

import connection from '../../database/connection';
import Order from '../../database/models/Order';
import OrderPayment from '../../database/models/OrderPayment';
import IOrderPayment from '../../models/entities/IOrderPayment';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import CreateOrder from './CreateOrder';
import PayWithMoneyDTO from './PayWithMoneyDTO';

export class PayWithMoney {
  private createOrder: CreateOrder;
  private transaction: Transaction;

  constructor() {
    this.createOrder = new CreateOrder();
  }

  async pay(data: PayWithMoneyDTO): Promise<void> {
    await this.createTransation();
    const order = await this.createOrderFromData(data);
    await this.createOrderPayment(order);

    this.transaction.commit();
  }

  private async createTransation() {
    this.transaction = await connection.transaction();
    this.createOrder.useTransaction(this.transaction);
  }

  private async createOrderFromData(data: PayWithMoneyDTO) {
    this.createOrder
      .withCustomer(data.customerId)
      .withItem(data.itemId, data.itemType)
      .withQuantity(data.quantity)
      .withUser(data.userId);

    return this.createOrder.create();
  }

  private async createOrderPayment(order: Order) {
    const payment: IOrderPayment = {
      orderId: order.id,
      type: PaymentTypeEnum.Money,
      tip: 0,
      discount: order.discount,
      amount: order.amount
    };

    await OrderPayment.create(payment, { transaction: this.transaction });
  }
}
