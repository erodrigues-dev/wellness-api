import { Transaction } from 'sequelize';

import Activity from '../database/models/Activity';
import CustomerDiscount from '../database/models/CustomerDiscount';
import Order from '../database/models/Order';
import OrderItem from '../database/models/OrderItem';
import Package from '../database/models/Package';
import IOrder from '../models/entities/IOrder';
import IOrderItem from '../models/entities/IOrderItem';
import { IPackageWithIncludes } from '../models/entities/IPackage';
import { DiscountTypeEnum } from '../models/enums/DiscountTypeEnum';
import { OrderItemTypeEnum } from '../models/enums/OrderItemTypeEnum';

export class OrderBuilder {
  private type: 'activity' | 'package';
  private activityId: number;
  private packageId: number;
  private customerId: number;
  private userId: number;
  private discount: number;
  private price: number;
  private quantity: number;

  private activity: Activity;
  private package: IPackageWithIncludes;
  private customerDiscount: CustomerDiscount;
  private transaction: Transaction;
  private order: Order;

  withActivity(id: number) {
    this.type = 'activity';
    this.activityId = id;
    return this;
  }

  withPackage(id: number) {
    this.type = 'package';
    this.packageId = id;
    return this;
  }

  withUser(id: number) {
    this.userId = id;
    return this;
  }

  withCustomer(id: number) {
    this.customerId = id;
    return this;
  }

  withQuantity(qtd: number) {
    this.quantity = qtd;
    return this;
  }

  withItem(type: 'activity' | 'package', itemId: number) {
    this.type = type;
    if (type === 'activity') this.activityId = itemId;
    else this.packageId = itemId;

    return this;
  }

  async build() {
    this.transaction = await this.createTransaction();
    await this.load();
    this.calculateDiscount();
    await this.createOrder();
    await this.createItems();
  }

  async payWithMoney() {}

  save() {
    return this.transaction.commit();
  }

  private async createTransaction() {
    return Order.sequelize.transaction();
  }

  private async load() {
    if (this.type === 'activity')
      this.activity = await Activity.findByPk(this.activityId);

    if (this.type === 'package') {
      this.package = await Package.findByPk(this.packageId, {
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
        customerId: this.customerId,
        relationId: this.type === 'activity' ? this.activityId : this.packageId,
        relationType: this.type
      }
    });
  }

  private calculateDiscount() {
    this.price =
      this.type === 'activity' ? this.activity.price : this.package.price;

    if (!this.customerDiscount) {
      this.discount = 0;
      return;
    }

    const discount = this.customerDiscount.value;

    if (this.customerDiscount.type === DiscountTypeEnum.Percent)
      this.discount = (discount / 100) * this.price;
    else this.discount = discount;
  }

  private async createOrder() {
    const orderData: IOrder = {
      customerId: this.customerId,
      userId: this.userId,
      subtotal: this.price,
      tip: 0,
      discount: this.discount,
      amount: this.price - this.discount
    };

    this.order = await Order.create(orderData, {
      transaction: this.transaction
    });
  }

  private async createItems() {
    if (this.type === 'activity') {
      await this.createActivityOrdemItem();
    } else {
      await this.createPackageOrdemItems();
    }
  }

  private async createActivityOrdemItem() {
    const orderItemData: IOrderItem = {
      orderId: this.order.id,
      type: OrderItemTypeEnum.Activity,
      metadataId: this.activityId,
      name: this.activity.name,
      price: this.activity.price,
      quantity: this.quantity
    };

    await OrderItem.create(orderItemData, { transaction: this.transaction });
  }

  private async createPackageOrdemItems() {
    const orderItem = await OrderItem.create(
      {
        orderId: this.order.id,
        type: OrderItemTypeEnum.Package,
        metadataId: this.packageId,
        name: this.package.name,
        price: this.package.price,
        quantity: this.quantity,
        recurrency: this.package.recurrencyPay,
        valueType: this.package.type,
        value: this.package.total,
        expiresIn: this.package.expiration
      },
      { transaction: this.transaction }
    );

    await Promise.all(
      this.package.activities.map(item =>
        OrderItem.create(
          {
            orderId: this.order.id,
            type: OrderItemTypeEnum.Activity,
            metadataId: item.id,
            name: item.name,
            price: item.price,
            parentId: orderItem.id,
            value: item.PackageActivity.quantity
          } as IOrderItem,
          { transaction: this.transaction }
        )
      )
    );
  }
}
