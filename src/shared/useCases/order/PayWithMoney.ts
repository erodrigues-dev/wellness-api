import { Transaction } from 'sequelize';

import connection from '../../database/connection';
import Order from '../../database/models/Order';
import OrderPayment from '../../database/models/OrderPayment';
import IOrderPayment from '../../models/entities/IOrderPayment';
import { PaymentStatusEnum } from '../../models/enums/PaymentStatusEnum';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import CreateOrder from './CreateOrder';
import CreateOrderDTO from './CreateOrderDTO';

export default class PayWithMoney {
  private createOrder: CreateOrder;
  private transaction: Transaction;

  constructor() {
    this.createOrder = new CreateOrder();
  }

  async pay(data: CreateOrderDTO): Promise<void> {
    try {
      await this.createTransation();
      const order = await this.createOrder
        .useTransaction(this.transaction)
        .withData(data)
        .create();
      await this.createOrderPayment(order);
      await this.commit();
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  private async commit() {
    await this.transaction.commit();
  }

  private async rollback() {
    try {
      await this.transaction.rollback();
    } catch (error) {
      console.log(error);
    }
  }

  private async createTransation() {
    this.transaction = await connection.transaction();
  }

  private async createOrderPayment(order: Order) {
    const payment: IOrderPayment = {
      orderId: order.id,
      type: PaymentTypeEnum.Money,
      tip: 0,
      discount: order.discount,
      amount: order.total,
      status: PaymentStatusEnum.Completed,
      recurrency: RecurrencyPayEnum.oneTime
    };

    await OrderPayment.create(payment, { transaction: this.transaction });
  }
}
