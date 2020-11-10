import { Transaction } from 'sequelize/types';

import connection from '../../database/connection';
import CreateOrder from './CreateOrder';
import CreateOrderWithCardDTO from './CreateOrderWithCardDTO';

export default class PayWithCard {
  private transaction: Transaction;
  private createOrder: CreateOrder;

  constructor() {
    this.createOrder = new CreateOrder();
  }

  async pay(data: CreateOrderWithCardDTO): Promise<void> {
    console.log(data);
    try {
      await this.createTransaction();
      await this.createOrderWithData(data);
      await this.checkOrCreateUserInSquare();
      await this.commit();
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  private async createTransaction() {
    this.transaction = await connection.transaction();
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

  private async createOrderWithData(data: CreateOrderWithCardDTO) {
    await this.createOrder
      .useTransaction(this.transaction)
      .withData(data)
      .create();
  }

  private async checkOrCreateUserInSquare() {}

  private async saveCard() {}
}
