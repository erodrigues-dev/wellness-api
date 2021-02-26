import CustomError from '../../../shared/custom-error/CustomError';
import Customer from '../../../shared/database/models/Customer';
import verificationCodeService from '../../../shared/services/EmailConfirmationCodeService';
import { squareCustomerService } from '../../../shared/square/services';
import { deleteFileFromUrl } from '../../../shared/utils/google-cloud-storage';
import { hash } from '../../../shared/utils/hash-password';
import { AccountData } from './AccountData';
import { AccountViewModel } from './AccountViewModel';

export class AccountUseCase {
  async get(userId: number): Promise<AccountViewModel> {
    const model = await Customer.findByPk(userId);

    return {
      id: model.id,
      name: model.name,
      email: model.email,
      phone: model.phone,
      image_url: model.imageUrl
    };
  }

  async save(data: AccountData): Promise<AccountViewModel> {
    const user = await Customer.findByPk(data.id);

    user.name = data.name;
    user.phone = data.phone;

    await this.changeEmail(user, data.email, data.verification_code);
    await this.changePassword(user, data.password);

    await this.updateInSquare(user);
    await user.save();

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image_url: user.imageUrl
    };
  }

  async changeImage(userId: number, imageUrl: string) {
    if (!imageUrl) throw new CustomError('Image is required');
    const user = await Customer.findByPk(userId);
    if (user.imageUrl) await deleteFileFromUrl(user.imageUrl);
    user.imageUrl = imageUrl;
    await user.save();
  }

  async listCards(userId: number) {
    const user = await Customer.findByPk(userId);
    return squareCustomerService.listCards(user.squareId);
  }

  async createCard(userId: number, cardNonce: string, cardName: string) {
    const user = await Customer.findByPk(userId);
    return squareCustomerService.createCard(user.squareId, cardNonce, cardName);
  }

  async deleteCard(userId: number, cardId: string) {
    const user = await Customer.findByPk(userId);
    await squareCustomerService.deleteCard(user.squareId, cardId);
  }

  private async changeEmail(user: Customer, newEmail: string, verificationCode: string): Promise<void> {
    if (user.email === newEmail) return;
    if (!verificationCode) throw new CustomError('Verification code is required');
    console.log(`check verification_code => ${newEmail} ${verificationCode}`);
    const codeIsValid = await verificationCodeService.codeIsValid(newEmail, verificationCode);
    if (!codeIsValid) throw new CustomError('Verification code is not valid.');
    console.log('> email changed');
    user.email = newEmail;
    await verificationCodeService.deleteByEmail(newEmail);
  }

  private async changePassword(user: Customer, newPassword: string) {
    if (!newPassword) return;

    console.log('> password changed');
    user.password = await hash(newPassword);
  }

  private async updateInSquare(user: Customer) {
    const [given_name, ...family_name] = user.name.split(' ');
    const { id: squareId } = await squareCustomerService.createOrUpdate({
      id: user.squareId,
      email_address: user.email,
      given_name,
      family_name: family_name.join(' ')
    });

    user.squareId = squareId;
  }
}
