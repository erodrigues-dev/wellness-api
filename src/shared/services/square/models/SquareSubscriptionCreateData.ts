import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { RecurrencyPayEnum } from '../../../models/enums/RecurrencyPayEnum';

export class SquareSubscriptionCreateData {
  idempotency_key: string;
  location_id: string;
  plan_id: string;
  customer_id: string;
  card_id: string;
  start_date: string;
  price_override_money: {
    amount: number;
    currency: string;
  };

  constructor() {
    this.idempotency_key = uuidv4();
    this.location_id = process.env.SQUARE_LOCATION_ID;
  }

  setSubscriptionPlan(type: RecurrencyPayEnum) {
    if (type === RecurrencyPayEnum.monthly)
      this.plan_id = process.env.SQUARE_SUBSCRIPTION_PLAN_MONTHLY;

    if (type === RecurrencyPayEnum.weekly)
      this.plan_id = process.env.SQUARE_SUBSCRIPTION_PLAN_WEEKLY;
  }

  setPrice(price: number) {
    this.price_override_money = {
      amount: price * 100,
      currency: 'USD'
    };
  }

  setDueDate(date: Date) {
    this.start_date = format(date, 'yyyy-MM-dd');
  }
}
