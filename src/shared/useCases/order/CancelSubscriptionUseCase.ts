import CustomError from '../../custom-error/CustomError';
import Customer from '../../database/models/Customer';
import Order from '../../database/models/Order';
import { OrderItemTypeEnum, PaymentTypeEnum, RecurrencyPayEnum } from '../../models/enums';
import { sendEmailOrderCancel } from '../../sendingblue';
import { SquareSubscription } from '../../square/models/SquareSubscription';
import { squareSubscriptionService } from '../../square/services';

export class CancelSubscriptionUseCase {
  private order: Order;
  private subscription: SquareSubscription;

  constructor(private orderId: number) {}

  async cancel(): Promise<void> {
    await this.loadOrder();
    await this.checkIsRecurrencyOrder();
    await this.cancelInSquare();
    await this.updateOrder();
    await this.sendEmail();
  }

  async loadOrder(): Promise<void> {
    const order = await Order.findByPk(this.orderId, {
      include: [
        {
          association: 'orderPackages',
          attributes: ['recurrencyPay']
        },
        {
          association: 'customer',
          attributes: ['name', 'email']
        }
      ]
    });
    if (!order) throw new CustomError('Order not found', 404);

    if (order.canceledDate) throw new CustomError('Order already is canceled');

    this.order = order;
  }

  private async checkIsRecurrencyOrder(): Promise<void> {
    const [packageData] = this.order.orderPackages;

    if (this.order.paymentType !== PaymentTypeEnum.Card)
      throw new CustomError('This order is not pay with credit card');

    if (
      this.order.type === OrderItemTypeEnum.Activity ||
      packageData?.recurrencyPay === RecurrencyPayEnum.oneTime
    )
      throw new CustomError('This order is not a subscription plan');
  }

  private async cancelInSquare(): Promise<void> {
    this.subscription = await squareSubscriptionService.cancel(
      this.order.transactionId
    );
  }

  private async updateOrder(): Promise<void> {
    this.order.canceledDate = new Date();
    if (this.subscription.paid_until_date) {
      this.order.paidUntilDate = new Date(
        `${this.subscription.paid_until_date}T00:00:00`
      );
    }
    this.order.status = this.subscription.status;

    await this.order.save();
  }

  private async sendEmail(): Promise<void> {
    const [packageObj] = this.order.orderPackages;
    await sendEmailOrderCancel.send({
      to: {
        name: this.order.customer.name,
        email: this.order.customer.email
      },
      params: {
        name: packageObj.name,
        recurrency: packageObj.recurrencyPay,
        canceledDate: this.order.canceledDate,
        paidUntilDate: this.order.paidUntilDate
      }
    });
  }
}
