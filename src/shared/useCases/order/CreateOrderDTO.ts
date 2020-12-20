import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';
import { PaymentTypeEnum } from '../../models/enums/PaymentTypeEnum';

export default class CreateOrderDTO {
  customerId: number;
  itemType: OrderItemTypeEnum;
  itemId: number;
  quantity: number;
  tip: number;
  userId: number;
  paymentType: PaymentTypeEnum;

  parseFromBody(body: any) {
    this.customerId = Number(body.customerId);
    this.itemType = body.itemType;
    this.itemId = Number(body.itemId);
    this.quantity = Number(body.quantity) || 1;
    this.tip = Number(body.tip) || 0;
    this.paymentType = body.paymentType;

    return this;
  }

  withUserId(id: number) {
    this.userId = id;

    return this;
  }
}
