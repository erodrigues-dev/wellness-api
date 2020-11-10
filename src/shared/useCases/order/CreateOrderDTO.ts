import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';

export default class CreateOrderDTO {
  customerId: number;
  itemType: OrderItemTypeEnum;
  itemId: number;
  quantity: number;
  tip: number;
  userId: number;

  parseFromBody(body: any) {
    this.customerId = Number(body.customerId);
    this.itemType = body.itemType;
    this.itemId = Number(body.itemId);
    this.quantity = Number(body.quantity) || 1;
    this.tip = Number(body.tip) || 0;

    return this;
  }

  withUserId(id: number) {
    this.userId = id;

    return this;
  }
}
