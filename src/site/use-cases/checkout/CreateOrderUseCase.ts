import { OrderItemTypeEnum, PaymentTypeEnum } from '../../../shared/models/enums';
import CreateOrderWithCardDTO from '../../../shared/useCases/order/CreateOrderWithCardDTO';
import PayWithCard from '../../../shared/useCases/order/PayWithCard';
import { convertToDate } from '../../../shared/utils/date-utils';

interface CreateOrderData {
  card_id: string;
  due_date: string;
  quantity: number;
  tip: number;
  product_id: number;
  product_type: string;
  user_id: number;
}

export class CreateOrderUseCase {
  async create(data: CreateOrderData): Promise<void> {
    const dto = this.getCreateOrderDTO(data);
    const payWithCard = new PayWithCard(dto);
    await payWithCard.pay();
  }

  private getCreateOrderDTO(data: CreateOrderData) {
    const dto = new CreateOrderWithCardDTO();
    dto.cardId = data.card_id;
    dto.dueDate = convertToDate(data.due_date);
    dto.quantity = data.quantity;
    dto.tip = data.tip || 0;
    dto.itemId = data.product_id;
    dto.itemType = data.product_type as OrderItemTypeEnum;
    dto.customerId = data.user_id;
    dto.paymentType = PaymentTypeEnum.Card;

    return dto;
  }
}
