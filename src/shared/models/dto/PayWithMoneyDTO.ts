export default class PayWithMoneyDTO {
  customerId: number;
  itemType: 'package' | 'activity';
  itemId: number;
  quantity: number;
  userId: number;

  fromRequest(body: any) {
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
