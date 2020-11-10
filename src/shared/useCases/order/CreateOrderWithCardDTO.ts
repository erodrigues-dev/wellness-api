import CreateOrderDTO from './CreateOrderDTO';

export default class CreateOrderWithCardDTO extends CreateOrderDTO {
  cardId: string;
  dueDate: Date;
  saveCard: boolean;

  parseFromBody(body: any) {
    super.parseFromBody(body);
    this.cardId = String(body.cardId);
    if (body.dueDate) this.dueDate = new Date(body.dueDate);
    this.saveCard = !!body.saveCard;
    return this;
  }
}
