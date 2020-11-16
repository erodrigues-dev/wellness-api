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

class PaymentData {
  customerId: string;
  cardId: string;
}

export default class PayWithCard {
  private transaction: Transaction;
  private createOrder = new CreateOrder();
  private payment = new PaymentData();

  constructor(private data: CreateOrderWithCardDTO) {}

  async pay(): Promise<void> {
    console.log(this.data);
    try {
      await this.createTransaction();
      await this.createOrderWithData();

      this.payment.customerId = await this.getCustomerSquareIdOrCreate();
      this.payment.cardId = await this.getCardIdOrCreate();

      await this.createPaymentInSquare();
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

  private async createOrderWithData() {
    await this.createOrder
      .useTransaction(this.transaction)
      .withData(this.data)
      .create();
  }

  private async getCustomerSquareIdOrCreate() {
    const customer = await Customer.findByPk(this.data.customerId);
    if (!customer) throw new CustomError('Invalid Customer Id', 400);
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

  private async getCardIdOrCreate() {
    if (!this.data.saveCard) return this.data.cardId;

    const { id } = await squareUserService.createCard(
      this.payment.customerId,
      this.data.cardId,
      this.data.cardName
    );

    return id;
  }

  private async createPaymentInSquare() {
    const { total } = this.createOrder.getCreatedOrder();
    const { name } = this.createOrder.getCreatedOrderItem();
    return squarePaymentService.create({
      idempotency_key: uuid(),
      customer_id: this.payment.customerId,
      source_id: this.payment.cardId,
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
