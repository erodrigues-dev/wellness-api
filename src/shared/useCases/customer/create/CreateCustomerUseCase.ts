import { Customer } from '../../../models/entities/Customer';
import { CustomerViewModel } from '../../../models/viewmodels/CustomerViewModel';
import { sendEmailSignUp } from '../../../sendingblue';
import customerService from '../../../services/CustomerService';
import { SquareCustomer } from '../../../square/models/SquareCustomer';
import { squareCustomerService } from '../../../square/services/index';
import { generateTempPassword } from '../../../utils/hash-password';
import { CreateCustomerModel } from './CreateCustomerModel';

import { ENV } from '../../../config/env';

export default class CreateCustomerUseCase {
  private customer: Customer;
  private squareCustomer: SquareCustomer;
  private tempPassword: string;

  constructor(private data: CreateCustomerModel) {
    this.tempPassword = generateTempPassword();
  }

  async create(): Promise<CustomerViewModel> {
    await this.createCustomer();
    await this.createCustomerInSquare();
    await this.updateCustomerWithSquareId();
    await this.sendEmail();

    return CustomerViewModel.map(this.customer);
  }

  private async createCustomer(): Promise<void> {
    this.customer = await customerService.create({
      name: this.data.name,
      email: this.data.email,
      imageUrl: this.data.imageUrl,
      password: this.tempPassword,
      privateNotes: this.data.privateNotes,
      publicNotes: this.data.publicNotes,
      phone: this.data.phone
    });
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
    await customerService.updateSquareId(this.customer.id, this.squareCustomer.id);
  }

  private async sendEmail(): Promise<void> {
    if (!ENV.SEND_EMAIL_SIGNUP_CUSTOMER) return Promise.resolve();

    await sendEmailSignUp.send({
      name: this.customer.name,
      email: this.customer.email,
      tempPassword: this.tempPassword
    });
  }
}
