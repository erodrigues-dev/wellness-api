import { Transaction } from 'sequelize';
import { v4 as uuid } from 'uuid';

import CustomError from '../../custom-error/CustomError';
import connection from '../../database/connection';
import Customer from '../../database/models/Customer';
import OrderPayment from '../../database/models/OrderPayment';
import IOrderPayment from '../../models/entities/IOrderPayment';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import { squarePaymentService, squareUserService } from '../../services/square/index';
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
      const customerSquareId = await this.getCustomerSquareIdOrCreate(
        data.customerId
      );
      if (data.saveCard) await this.saveCard(customerSquareId, data.cardId);
      await this.createPaymentInSquare(customerSquareId, data.cardId);
      await this.createPaymentOrder();
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

  private async getCustomerSquareIdOrCreate(customerId: number) {
    const customer = await Customer.findByPk(customerId);
    if (!customer) throw new CustomError('Customer not found', 400);
    if (customer.squareId) return customer.squareId;
    const { id } = await this.createCustomerInSquare(customer);
    customer.squareId = id;
    await customer.save();

    return id;
  }

  private async createCustomerInSquare(customer: Customer) {
    const [given_name, ...family_name] = customer.name.split(' ');

    return squareUserService.create({
      given_name,
      family_name: family_name.join(' '),
      email_address: customer.email
    });
  }

  private saveCard(customerSquareId: string, cardId: string) {
    return squareUserService.createCard(customerSquareId, cardId);
  }

  private async createPaymentInSquare(customerId: string, cardId: string) {
    const { total } = this.createOrder.getCreatedOrder();
    const { name } = this.createOrder.getCreatedOrderItem();
    return squarePaymentService.create({
      idempotency_key: uuid(),
      customer_id: customerId,
      source_id: cardId,
      note: name,
      amount_money: {
        amount: total * 100,
        currency: 'USD'
      }
    });
  }

  private async createPaymentOrder() {
    const order = this.createOrder.getCreatedOrder();
    const data: IOrderPayment = {
      orderId: order.id,
      type: PaymentTypeEnum.Card,
      tip: order.tip,
      discount: order.discount,
      amount: order.total
    };

    return OrderPayment.create(data, { transaction: this.transaction });
  }
}
