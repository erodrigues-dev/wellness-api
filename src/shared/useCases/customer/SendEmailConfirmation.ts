import EmailConfirmationCode from '../../database/models/EmailConfirmationCode';
import { sendEmailConfirmation } from '../../sendingblue';
import { generateTempPassword } from '../../utils/hash-password';

export class SendEmailConfirmationUseCase {
  constructor(private name: string, private email: string) {}

  async send(): Promise<void> {
    const confirmationCode = await this.checkLimitPeriod();
    await sendEmailConfirmation.send(
      this.name,
      this.email,
      confirmationCode.code
    );
  }

  private async checkLimitPeriod(): Promise<EmailConfirmationCode> {
    const confirmation = await EmailConfirmationCode.create({
      email: this.email,
      code: generateTempPassword()
    });

    return confirmation.toJSON() as EmailConfirmationCode;
  }
}
