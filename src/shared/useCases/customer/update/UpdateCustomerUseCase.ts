import { Customer } from '../../../models/entities/Customer';
import customerService from '../../../services/CustomerService';
import { SquareCustomer } from '../../../square/models/SquareCustomer';
import { squareCustomerService } from '../../../square/services/index';
import { UpdateCustomerModel } from './UpdateCustomerModel';

export default class UpdateCustomer {
  private customer: Customer;

  constructor(private data: UpdateCustomerModel) {}

  async update(): Promise<Customer> {
    await this.updateCustomer();
    await this.updateCustomerInSquare();
    await this.sendEmailConfirmation();

    return this.customer;
  }

  private async updateCustomer(): Promise<void> {
    this.customer = await customerService.update(
      Object.assign(new Customer(), this.data)
    );
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
      await customerService.updateSquareId(
        this.customer.id,
        this.customer.squareId
      );
    }
  }

  private async sendEmailConfirmation(): Promise<void> {
    //TODO enviar somente se o email for alterado
  }
}
