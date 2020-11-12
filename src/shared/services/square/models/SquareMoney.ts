export class SquareMoney {
  amount: number;
  currency: string;

  constructor(obj?: any) {
    this.amount = obj?.amount;
    this.currency = obj?.currency;
  }
}
