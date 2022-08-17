import EmailConfirmationCode from '../../database/models/EmailConfirmationCode';
import { sendEmailConfirmation } from '../../sendingblue';
import { generateConfirmationCode } from '../../utils/hash-password';

export class SendEmailConfirmationUseCase {
  constructor(private name: string, private email: string) {}

  async send(): Promise<void> {
    const { code } = await this.createOrUpdateConfirmation();
    await this.sendEmail(code);
  }

  private async createOrUpdateConfirmation(): Promise<EmailConfirmationCode> {
    const confirmation = await this.findAndUpdateCode();

    if (confirmation) return confirmation;

    return this.create();
  }

  private async findAndUpdateCode(): Promise<EmailConfirmationCode> {
    let confirmation = await EmailConfirmationCode.findOne({
      where: { email: this.email }
    });

    if (!confirmation) return null;

    confirmation.code = generateConfirmationCode();
    await confirmation.save();

    return confirmation;
  }

  private create(): Promise<EmailConfirmationCode> {
    return EmailConfirmationCode.create({
      email: this.email,
      code: generateConfirmationCode()
    });
  }

  private async sendEmail(code: string) {
    await sendEmailConfirmation.send(this.name, this.email, code);
  }
}
