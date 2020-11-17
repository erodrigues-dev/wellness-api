import { v4 as uuid } from 'uuid';

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
    this.amount_money = {
      amount: amount * 100,
      currency: 'USD'
    };
  }

  setTip(tip: number) {
    if (tip) {
      this.tip_money = {
        amount: tip * 100,
        currency: 'USD'
      };
    }
  }
}
