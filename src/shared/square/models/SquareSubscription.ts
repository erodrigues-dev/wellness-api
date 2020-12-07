import { PaymentStatusEnum } from '../../models/enums/PaymentStatusEnum';
import { SquareMoney } from './SquareMoney';

export class SquareSubscription {
  id: string;
  location_id: string;
  plan_id: string;
  customer_id: string;
  start_date: string;
  status: PaymentStatusEnum;
  price_override_money: SquareMoney;
  version: number;
  created_at: string;
  card_id: string;
  invoice_ids: string[];
  paid_until_date: string;
}
