export class SquareCard {
  id: string;
  card_brand: string;
  last_4: string;
  exp_month: number;
  exp_year: number;

  constructor(obj?: any) {
    this.id = obj?.id;
    this.card_brand = obj?.card_brand;
    this.last_4 = obj?.last_4;
    this.exp_month = obj?.exp_month;
    this.exp_year = obj?.exp_year;
  }
}
