export class SquareCustomer {
  id?: string;
  given_name: string;
  family_name: string;
  email_address: string;

  constructor(obj?: any) {
    this.id = obj?.id;
    this.given_name = obj?.given_name;
    this.family_name = obj?.family_name;
    this.email_address = obj?.email_address;
  }
}
