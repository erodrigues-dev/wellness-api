import { Transaction } from 'sequelize';

import CustomError from '../../custom-error/CustomError';
import connection from '../../database/connection';
import Customer from '../../database/models/Customer';
import OrderPayment from '../../database/models/OrderPayment';
import IOrderPayment from '../../models/entities/IOrderPayment';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import {
    squareCustomerService, squarePaymentService, squareSubscriptionService
} from '../../services/square/index';
import { SquarePayment } from '../../services/square/models/SquarePayment';
import { SquarePaymentCreateData } from '../../services/square/models/SquarePaymentCreateData';
import { SquareSubscription } from '../../services/square/models/SquareSubscription';
import {
    SquareSubscriptionCreateData
} from '../../services/square/models/SquareSubscriptionCreateData';
import CreateOrder from './CreateOrder';
import CreateOrderWithCardDTO from './CreateOrderWithCardDTO';

class PaymentData {
  customerId: string;
  cardId: string;
  squarePayment: SquarePayment;
  squareSubscription: SquareSubscription;
}

export default class PayWithCard {
  private transaction: Transaction;
  private createOrder = new CreateOrder();
  private payment = new PaymentData();

  constructor(private data: CreateOrderWithCardDTO) {}

  async pay(): Promise<void> {
    try {
      console.log('pay with card');
      console.log('creating transaction');
      await this.createTransaction();
      console.log('creating order and items');
      await this.createOrderData();
      console.log('customer get square id');
      await this.getCustomerSquareIdOrCreate();
      console.log('card get square id');
      await this.getCardOrCreate();
      console.log('processing payment');
      await this.processPayment();
      console.log('creating payment order');
      await this.createPaymentOrder();
      console.log('commit');
      await this.commit();
    } catch (error) {
      console.log(error);
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

  private async createOrderData() {
    await this.createOrder
      .useTransaction(this.transaction)
      .withData(this.data)
      .create();
  }

  private async getCustomerSquareIdOrCreate() {
    const customer = await Customer.findByPk(this.data.customerId);
    if (!customer) throw new CustomError('Invalid Customer Id', 400);
    if (customer.squareId) {
      this.payment.customerId = customer.squareId;
      return;
    }

    const { id } = await this.createCustomerInSquare(customer);
    customer.squareId = id;
    await customer.save();

    this.payment.customerId = id;
  }

  private async createCustomerInSquare(customer: Customer) {
    const [given_name, ...family_name] = customer.name.split(' ');

    return squareCustomerService.create({
      given_name,
      family_name: family_name.join(' '),
      email_address: customer.email
    });
  }

  private async getCardOrCreate() {
    const { recurrency } = this.createOrder.getCreatedOrderItem();
    const isRecurrently = recurrency !== RecurrencyPayEnum.oneTime;

    this.payment.cardId = this.data.cardId;

    if (this.data.saveCard || isRecurrently) {
      const customerCards = squareCustomerService.listCards(
        this.payment.customerId
      );
      const isSavedCard = (await customerCards).some(
        card => card.id === this.data.cardId
      );

      if (!isSavedCard) {
        const { id } = await squareCustomerService.createCard(
          this.payment.customerId,
          this.data.cardId,
          this.data.cardName
        );

        this.payment.cardId = id;
      }
    }
  }

  private async processPayment() {
    const { recurrency } = this.createOrder.getCreatedOrderItem();

    if (recurrency === RecurrencyPayEnum.oneTime)
      await this.createPaymentInSquare();
    else await this.createSubscriptionInSquare();
  }

  private async createPaymentInSquare() {
    console.log('creating square payment');
    const { total, tip } = this.createOrder.getCreatedOrder();
    const { name } = this.createOrder.getCreatedOrderItem();

    const data = new SquarePaymentCreateData();
    data.note = name;
    data.customer_id = this.payment.customerId;
    data.source_id = this.payment.cardId;
    data.setAmount(total);
    data.setTip(tip);

    this.payment.squarePayment = await squarePaymentService.create(data);
  }

  private async createSubscriptionInSquare() {
    console.log('creating square subscription');
    const subscriptionPlanId = this.createOrder.getSubscriptionPlanId();

    const data = new SquareSubscriptionCreateData();
    data.customer_id = this.payment.customerId;
    data.card_id = this.payment.cardId;
    data.setDueDate(this.data.dueDate || new Date());
    data.setSubscriptionPlan(subscriptionPlanId);

    this.payment.squareSubscription = await squareSubscriptionService.create(
      data
    );
  }

  private async createPaymentOrder() {
    const {
      id: orderId,
      tip,
      discount,
      total: amount
    } = this.createOrder.getCreatedOrder();
    const { recurrency } = this.createOrder.getCreatedOrderItem();
    const { id: transactionId, status } =
      this.payment.squarePayment || this.payment.squareSubscription;

    const data: IOrderPayment = {
      type: PaymentTypeEnum.Card,
      orderId,
      tip,
      discount,
      amount,
      recurrency,
      transactionId,
      status,
      dueDate: this.data.dueDate
    };

    return OrderPayment.create(data, { transaction: this.transaction });
  }
}
