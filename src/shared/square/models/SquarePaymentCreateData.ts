import { v4 as uuid } from 'uuid';

import { SquareMoney } from './SquareMoney';

export class SquarePaymentCreateData {
  source_id: string;
  idempotency_key: string;
  customer_id: string;
  note?: string;
  amount_money: {
    amount: number;
    currency: string;
  };
  tip_money?: {
    amount: number;
    currency: string;
  };

  constructor() {
    this.idempotency_key = uuid();
  }

  setAmount(amount: number) {
    this.amount_money = new SquareMoney(amount);
  }

  setTip(tip: number) {
    if (tip) {
      this.tip_money = new SquareMoney(tip);
    }
  }
}
