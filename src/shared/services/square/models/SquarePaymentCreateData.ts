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
}
