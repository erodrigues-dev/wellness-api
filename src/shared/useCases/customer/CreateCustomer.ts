import Customer from '../../database/models/Customer';
import ICustomer from '../../models/entities/ICustomer';
import customerService from '../../services/CustomerService';
import { SquareCustomer } from '../../square/models/SquareCustomer';
import { squareCustomerService } from '../../square/services/index';
import { CustomerDTO } from './CustomerDTO';

export default class CreateCustomer {
  private customer: Customer;
  private squareCustomer: SquareCustomer;

  constructor(private data: CustomerDTO) {}

  async create(): Promise<ICustomer> {
    await this.createCustomer();
    await this.createCustomerInSquare();
    await this.updateCustomerWithSquareId();
    await this.sendEmailConfirmation();

    return this.customer;
  }

  private async createCustomer(): Promise<void> {
    this.customer = await customerService.create(this.data);
  }

  private async createCustomerInSquare(): Promise<void> {
    const [name, ...restName] = this.data.name.split(' ');
    this.squareCustomer = await squareCustomerService.create({
      given_name: name,
      family_name: restName.join(' '),
      email_address: this.data.email
    });
  }

  private async updateCustomerWithSquareId() {
    this.customer.squareId = this.squareCustomer.id;
    await this.customer.save();
  }

  private async sendEmailConfirmation(): Promise<void> {}
}
