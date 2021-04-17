import { Customer } from '../../../models/entities/Customer';
import { CustomerViewModel } from '../../../models/viewmodels/CustomerViewModel';
import customerService from '../../../services/CustomerService';
import { SquareCustomer } from '../../../square/models/SquareCustomer';
import { squareCustomerService } from '../../../square/services/index';
import { UpdateCustomerModel } from './UpdateCustomerModel';

export default class UpdateCustomerUseCase {
  private customer: Customer;

  constructor(private data: UpdateCustomerModel) {}

  async update(): Promise<CustomerViewModel> {
    await this.updateCustomer();
    await this.updateCustomerInSquare();

    return CustomerViewModel.map(this.customer);
  }

  private async updateCustomer(): Promise<void> {
    this.customer = await customerService.update({
      id: this.data.id,
      name: this.data.name,
      phone: this.data.phone,
      privateNotes: this.data.privateNotes,
      publicNotes: this.data.publicNotes,
      imageUrl: this.data.imageUrl
    });
  }

  private async updateCustomerInSquare(): Promise<void> {
    const [name, ...restName] = this.customer.name.split(' ');
    const squareCustomerData: SquareCustomer = {
      id: this.customer.squareId,
      given_name: name,
      family_name: restName.join(' '),
      email_address: this.customer.email
    };

    if (squareCustomerData.id) await squareCustomerService.update(squareCustomerData);
    else {
      const { id } = await squareCustomerService.create(squareCustomerData);
      this.customer.squareId = id;
      await customerService.updateSquareId(this.customer.id, this.customer.squareId);
    }
  }
}
