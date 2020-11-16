import CreateOrderDTO from './CreateOrderDTO';

export default class CreateOrderWithCardDTO extends CreateOrderDTO {
  cardId: string;
  cardName: string;
  dueDate: Date;
  saveCard: boolean;

  parseFromBody(body: any) {
    super.parseFromBody(body);
    this.cardId = String(body.cardId);
    this.cardName = String(body.cardName);
    if (body.dueDate) this.dueDate = new Date(body.dueDate);
    this.saveCard = !!body.saveCard;
    return this;
  }
}
