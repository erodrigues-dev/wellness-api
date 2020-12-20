import { Transaction } from 'sequelize';

import CustomError from '../../custom-error/CustomError';
import connection from '../../database/connection';
import Customer from '../../database/models/Customer';
import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import { SquarePayment } from '../../square/models/SquarePayment';
import { SquarePaymentCreateData } from '../../square/models/SquarePaymentCreateData';
import { SquareSubscription } from '../../square/models/SquareSubscription';
import { SquareSubscriptionCreateData } from '../../square/models/SquareSubscriptionCreateData';
import {
    squareCustomerService, squarePaymentService, squareSubscriptionService
} from '../../square/services/index';
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
      await this.createTransaction();
      await this.createOrderData();
      await this.getCustomerSquareIdOrCreate();
      await this.getCardOrCreate();
      await this.processPayment();
      await this.updatePaymentData();
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
    const isRecurrently = this.isRecurrently();

    this.payment.cardId = this.data.cardId;

    if (this.data.saveCard || isRecurrently) {
      const customerCards = await squareCustomerService.listCards(
        this.payment.customerId
      );
      const isSavedCard = customerCards.some(
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

  private isRecurrently() {
    let isRecurrently = false;

    if (this.data.itemType === OrderItemTypeEnum.Package) {
      const { recurrencyPay } = this.createOrder.getCreatedOrderPackage();
      isRecurrently = recurrencyPay !== RecurrencyPayEnum.oneTime;
    }
    return isRecurrently;
  }

  private async processPayment() {
    const isRecurrently = this.isRecurrently();

    if (isRecurrently) await this.createSubscriptionInSquare();
    else await this.createPaymentInSquare();
  }

  private async createPaymentInSquare() {
    console.log('creating square payment');
    const { amount, tip } = this.createOrder.getCreatedOrder();
    const { name } =
      this.data.itemType === OrderItemTypeEnum.Activity
        ? this.createOrder.getCreatedOrderActivity()
        : this.createOrder.getCreatedOrderPackage();

    const data = new SquarePaymentCreateData();
    data.note = name;
    data.customer_id = this.payment.customerId;
    data.source_id = this.payment.cardId;
    data.setAmount(amount);
    data.setTip(tip);

    this.payment.squarePayment = await squarePaymentService.create(data);
  }

  private async createSubscriptionInSquare() {
    console.log('creating square subscription');
    const { amount } = this.createOrder.getCreatedOrder();
    const subscriptionPlanId = this.createOrder.getSubscriptionPlanId();

    const data = new SquareSubscriptionCreateData();
    data.customer_id = this.payment.customerId;
    data.card_id = this.payment.cardId;
    data.setDueDate(this.data.dueDate || new Date());
    data.setSubscriptionPlan(subscriptionPlanId);
    data.setAmount(amount);

    this.payment.squareSubscription = await squareSubscriptionService.create(
      data
    );
  }

  private async updatePaymentData() {
    const order = this.createOrder.getCreatedOrder();
    const isRecurrently = this.isRecurrently();
    const { id: transactionId, status } =
      this.payment.squarePayment || this.payment.squareSubscription;

    const paidUntilDate = this.payment.squareSubscription?.paid_until_date
      ? new Date(this.payment.squareSubscription.paid_until_date)
      : null;

    order.paymentType = PaymentTypeEnum.Card;
    order.transactionId = transactionId;
    order.transactionType = isRecurrently ? 'subscription' : 'payment';
    order.paidUntilDate = paidUntilDate;
    order.status = status;

    await order.save({ transaction: this.transaction });
  }
}
