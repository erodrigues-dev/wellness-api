import { OrderItemTypeEnum } from '../../models/enums/OrderItemTypeEnum';

export default class PayWithMoneyDTO {
  customerId: number;
  itemType: OrderItemTypeEnum;
  itemId: number;
  quantity: number;
  userId: number;

  makeFromBody(body: any) {
    this.customerId = Number(body.customerId);
    this.itemType = body.itemType;
    this.itemId = Number(body.itemId);
    this.quantity = Number(body.quantity);

    return this;
  }

  withUserId(id: number) {
    this.userId = id;

    return this;
  }
}
