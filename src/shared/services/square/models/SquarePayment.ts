import { SquareMoney } from './SquareMoney';

export class SquarePayment {
  id: string;
  location_id: string;
  order_id: string;
  customer_id: string;
  note: string;
  amount_money: SquareMoney;
  status: string;
  created_at: Date;

  constructor(obj?: any) {
    this.id = obj?.id;
    this.location_id = obj?.location_id;
    this.order_id = obj?.order_id;
    this.customer_id = obj?.customer_id;
    this.note = obj?.note;
    this.amount_money = obj?.amount_money;
    this.status = obj?.status;
    this.created_at = obj?.created_at;
  }
}
