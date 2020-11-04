export default class PayWithMoneyDTO {
  customerId: number;
  itemType: 'package' | 'activity';
  itemId: number;
  userId: number;

  fromRequest(body: any) {
    this.customerId = Number(body.customerId);
    this.itemType = body.itemType;
    this.itemId = Number(body.itemId);

    return this;
  }
}
