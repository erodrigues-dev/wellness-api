import { Transaction } from 'sequelize';

import connection from '../../database/connection';
import Order from '../../database/models/Order';
import { PaymentStatusEnum } from '../../models/enums/PaymentStatusEnum';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import CreateOrderDTO from './CreateOrderDTO';
import CreateOrderUseCase from './CreateOrderUseCase';

export default class PayWithMoney {
  private createOrder: CreateOrderUseCase;
  private transaction: Transaction;

  constructor() {
    this.createOrder = new CreateOrderUseCase();
  }

  async pay(data: CreateOrderDTO): Promise<void> {
    try {
      await this.createTransation();
      const order = await this.createOrder
        .useTransaction(this.transaction)
        .withData(data)
        .create();
      await this.updatePaymentData(order);
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

  private async updatePaymentData(order: Order) {
    order.status = PaymentStatusEnum.Completed;
    order.paymentType = PaymentTypeEnum.Money;

    await order.save({ transaction: this.transaction });
  }
}
