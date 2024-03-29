import { Transaction } from 'sequelize';

import Activity from '../../database/models/Activity';
import Customer from '../../database/models/Customer';
import CustomerDiscount from '../../database/models/CustomerDiscount';
import Order from '../../database/models/Order';
import OrderActivity from '../../database/models/OrderActivity';
import OrderPackage from '../../database/models/OrderPackage';
import Package from '../../database/models/Package';
import { RecurrencyPayEnum } from '../../models/enums';
import { DiscountTypeEnum } from '../../models/enums/DiscountTypeEnum';
import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import { PaymentStatusEnum } from '../../models/enums/PaymentStatusEnum';
import { sendEmailOrderCreate } from '../../sendingblue';
import CreateOrderDTO from './CreateOrderDTO';

export default class CreateOrderUseCase {
  private data: CreateOrderDTO;

  private discount: number = 0;
  private price: number = 0;

  private transaction: Transaction;
  private activity: Activity;
  private package: Package;
  private customerDiscount: CustomerDiscount;
  private order: Order;
  private orderActivity: OrderActivity;
  private orderPackage: OrderPackage;
  private customer: Customer;

  useTransaction(transaction: Transaction) {
    this.transaction = transaction;
    return this;
  }

  withData(data: CreateOrderDTO) {
    this.data = data;

    return this;
  }

  async create() {
    await this.load();
    this.setPrice();
    this.calculateDiscount();
    await this.createOrder();
    await this.createItems();

    this.transaction.afterCommit(() => this.sendEmail());

    return this.order;
  }

  getCreatedOrder() {
    return this.order;
  }

  getCreatedOrderActivity() {
    return this.orderActivity;
  }

  getCreatedOrderPackage() {
    return this.orderPackage;
  }

  getSubscriptionPlanId() {
    return this.package?.squareId;
  }

  private async load() {
    if (this.data.itemType === OrderItemTypeEnum.Activity) this.activity = await Activity.findByPk(this.data.itemId);

    if (this.data.itemType === OrderItemTypeEnum.Package) {
      this.package = await Package.findByPk(this.data.itemId, {
        include: [
          {
            association: Package.associations.activities,
            through: { attributes: ['quantity'] }
          }
        ]
      });
    }

    this.customerDiscount = await CustomerDiscount.findOne({
      where: {
        customerId: this.data.customerId,
        relationId: this.data.itemId,
        relationType: this.data.itemType
      }
    });

    this.customer = await Customer.findByPk(this.data.customerId, {
      attributes: ['name', 'email']
    });
  }

  private setPrice() {
    this.price = this.data.itemType === OrderItemTypeEnum.Activity ? this.activity.price : this.package.price;
  }

  private calculateDiscount() {
    if (!this.customerDiscount) {
      this.discount = 0;
      return;
    }

    const discountValue = this.customerDiscount.value;

    if (this.customerDiscount.type === DiscountTypeEnum.Percent) {
      this.discount = (discountValue / 100) * this.price * this.data.quantity;
    } else {
      this.discount = discountValue * this.data.quantity;
    }

    this.discount = +this.discount.toFixed(2);
  }

  private async createOrder() {
    const orderData = {
      customerId: this.data.customerId,
      type: this.data.itemType,
      userId: this.data.userId,

      amount: this.price * this.data.quantity,
      discount: this.discount,
      tip: this.data.tip,
      quantity: this.data.quantity,

      paymentType: this.data.paymentType,
      status: PaymentStatusEnum.Pending
    };

    this.order = await Order.create(orderData, {
      transaction: this.transaction
    });
  }

  private async createItems() {
    if (this.data.itemType === OrderItemTypeEnum.Activity) await this.createOrderActivity();
    else await this.createOrderPackage();
  }

  private async createOrderActivity() {
    const orderActivityData = {
      orderId: this.order.id,
      activityId: this.data.itemId,
      name: this.activity.name,
      price: this.activity.price,
      description: this.activity.description,
      duration: this.activity.duration,
      categoryId: this.activity.categoryId,
      maxPeople: this.activity.maxPeople
    };

    this.orderActivity = await OrderActivity.create(orderActivityData, {
      transaction: this.transaction
    });
  }

  private async createOrderPackage() {
    this.orderPackage = await OrderPackage.create(
      {
        orderId: this.order.id,
        packageId: this.data.itemId,
        name: this.package.name,
        price: this.package.price,
        description: this.package.description,
        categoryId: this.package.categoryId,
        recurrencyPay: this.package.recurrencyPay,
        type: this.package.type,
        total: this.package.total,
        squareId: this.package.squareId,
        expiration: this.package.expiration
      },
      { transaction: this.transaction }
    );

    const orderActivities = await Promise.all(
      this.package.activities.map(activity =>
        OrderActivity.create(
          {
            orderId: this.order.id,
            activityId: activity.id,
            orderPackageId: this.orderPackage.id,
            name: activity.name,
            price: activity.price,
            description: activity.description,
            duration: activity.duration,
            categoryId: activity.categoryId,
            maxPeople: activity.maxPeople,
            packageQuantity: activity.PackageActivity?.quantity || 1
          },
          { transaction: this.transaction }
        )
      )
    );

    this.orderPackage.orderActivities = orderActivities;
  }

  private async sendEmail() {
    sendEmailOrderCreate.send({
      to: {
        name: this.customer.name,
        email: this.customer.email
      },
      params: {
        type: this.order.type,
        name: this.order.type === OrderItemTypeEnum.Activity ? this.activity.name : this.package.name,
        discount: this.order.discount,
        total: this.order.amount,
        quantity: this.order.quantity,
        paymentType: this.order.paymentType,
        recurrency: this.package?.recurrencyPay ?? RecurrencyPayEnum.oneTime
      }
    });
  }
}
