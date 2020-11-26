import Customer from '../../database/models/Customer';
import ICustomer from '../../models/entities/ICustomer';
import customerService from '../../services/CustomerService';
import { squareCustomerService } from '../../services/square/index';
import { SquareCustomer } from '../../services/square/models/SquareCustomer';
import { CustomerDTO } from './CustomerDTO';

export default class UpdateCustomer {
  private customer: Customer;

  constructor(private data: CustomerDTO) {}

  async update(): Promise<ICustomer> {
    await this.updateCustomer();
    await this.updateCustomerInSquare();
    await this.sendEmailConfirmation();

    return this.customer;
  }

  private async updateCustomer(): Promise<void> {
    this.customer = await customerService.update(this.data);
  }

  private async updateCustomerInSquare(): Promise<void> {
    const [name, ...restName] = this.data.name.split(' ');
    const squareCustomerData: SquareCustomer = {
      id: this.customer.squareId,
      given_name: name,
      family_name: restName.join(' '),
      email_address: this.data.email
    };

    if (squareCustomerData.id)
      await squareCustomerService.update(squareCustomerData);
    else {
      const { id } = await squareCustomerService.create(squareCustomerData);
      this.customer.squareId = id;
      await this.customer.save();
    }
  }

  private async sendEmailConfirmation(): Promise<void> {}
}
