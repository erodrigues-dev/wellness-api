import { Transaction } from 'sequelize';

import Activity from '../../database/models/Activity';
import CustomerDiscount from '../../database/models/CustomerDiscount';
import Order from '../../database/models/Order';
import OrderItem from '../../database/models/OrderItem';
import Package from '../../database/models/Package';
import IOrder from '../../models/entities/IOrder';
import IOrderItem from '../../models/entities/IOrderItem';
import { IPackageWithIncludes } from '../../models/entities/IPackage';
import { DiscountTypeEnum } from '../../models/enums/DiscountTypeEnum';
import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import CreateOrderDTO from './CreateOrderDTO';

export default class CreateOrder {
  private data: CreateOrderDTO;

  private discount: number = 0;
  private price: number = 0;

  private transaction: Transaction;
  private activity: Activity;
  private package: IPackageWithIncludes;
  private customerDiscount: CustomerDiscount;
  private order: Order;
  private orderItem: OrderItem;

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

    return this.order;
  }

  getCreatedOrder() {
    return this.order;
  }

  getCreatedOrderItem() {
    return this.orderItem;
  }

  private async load() {
    if (this.data.itemType === OrderItemTypeEnum.Activity)
      this.activity = await Activity.findByPk(this.data.itemId);

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
  }

  private setPrice() {
    this.price =
      this.data.itemType === OrderItemTypeEnum.Activity
        ? this.activity.price
        : this.package.price;
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
  }

  private async createOrder() {
    const orderData: IOrder = {
      customerId: this.data.customerId,
      userId: this.data.userId,
      subtotal: this.price,
      tip: this.data.tip,
      discount: this.discount,
      total: this.price * this.data.quantity - this.discount
    };

    this.order = await Order.create(orderData, {
      transaction: this.transaction
    });
  }

  private async createItems() {
    this.orderItem =
      this.data.itemType === OrderItemTypeEnum.Activity
        ? await this.createActivityOrdemItem()
        : await this.createPackageOrdemItems();
  }

  private async createActivityOrdemItem() {
    const orderItemData: IOrderItem = {
      orderId: this.order.id,
      type: OrderItemTypeEnum.Activity,
      metadataId: this.data.itemId,
      name: this.activity.name,
      price: this.activity.price,
      quantity: this.data.quantity
    };

    return OrderItem.create(orderItemData, { transaction: this.transaction });
  }

  private async createPackageOrdemItems() {
    const orderItem = await OrderItem.create(
      {
        orderId: this.order.id,
        type: OrderItemTypeEnum.Package,
        metadataId: this.data.itemId,
        name: this.package.name,
        price: this.package.price,
        quantity: this.data.quantity,
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

    return orderItem;
  }
}
