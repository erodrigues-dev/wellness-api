import { Transaction } from 'sequelize';

import CustomError from '../../../shared/custom-error/CustomError';
import conn from '../../../shared/database/connection';
import Customer from '../../../shared/database/models/Customer';
import { sendEmailConfirmation } from '../../../shared/sendingblue';
import emailConfirmationCodeService from '../../../shared/services/EmailConfirmationCodeService';
import { squareCustomerService } from '../../../shared/square/services';
import { generateRandomCode, hash } from '../../../shared/utils/hash-password';
import { SignupData, SendCodeData } from './models';

export class SignupUseCase {
  private transaction: Transaction;

  async create(data: SignupData): Promise<void> {
    try {
      await this.checkEmailInUse(data.email);
      await this.checkCode(data.email, data.code);

      this.transaction = await conn.transaction();
      const customer = await this.createCustomer(data);
      await this.updateReferral(data.referral_code, customer);
      const squareId = await this.createCustomerSquare(data);
      await this.update(customer, squareId);
      await this.deleteCode(data.email);
      this.transaction.commit();
    } catch (error) {
      if (this.transaction) this.transaction.rollback();
      throw error;
    }
  }

  async sendCode(data: SendCodeData) {
    const confirmation = await emailConfirmationCodeService.create(data.email);
    await sendEmailConfirmation.send(data.name, data.email, confirmation.code);
  }

  private async checkEmailInUse(email: string): Promise<void> {
    const count = await Customer.count({ where: { email } });

    if (count !== 0) throw new CustomError('Email already registered!');
  }

  private async checkCode(email: string, code: string): Promise<void> {
    const isValid = await emailConfirmationCodeService.codeIsValid(email, code);
    if (!isValid) throw new CustomError('Confirmation code is invalid.');
  }

  private async createCustomer(data: SignupData): Promise<Customer> {
    return Customer.create(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: await hash(data.password),
        referralCode: generateRandomCode(8)
      },
      { transaction: this.transaction }
    );
  }

  private async createCustomerSquare(data: SignupData): Promise<string> {
    const [given_name, ...rest] = data.name.split(' ');
    const squareCustomer = await squareCustomerService.create({
      email_address: data.email,
      given_name,
      family_name: rest.join(' ')
    });

    return squareCustomer.id;
  }

  private async update(customer: Customer, squareId: string): Promise<void> {
    customer.squareId = squareId;
    await customer.save({ transaction: this.transaction });
  }

  private async deleteCode(email: string) {
    await emailConfirmationCodeService.deleteByEmail(email);
  }

  private async updateReferral(referralCode: string, customer: Customer) {
    if (!referralCode) return;

    const { id: referralId } = await Customer.findOne({ where: { referralCode }, attributes: ['id'] });

    if (referralId) {
      customer.referralId = referralId;
      await customer.save({ transaction: this.transaction });
    }
  }
}
