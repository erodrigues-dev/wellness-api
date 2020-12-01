export class SquareMoney {
  amount: number;
  currency: string;

  constructor(amount?: number) {
    this.amount = amount ? Math.round(amount * 100) : 0;
    this.currency = 'USD';
  }
}
