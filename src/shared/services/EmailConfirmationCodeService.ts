import EmailConfirmationCode from '../database/models/EmailConfirmationCode';
import { generateTempPassword } from '../utils/hash-password';

export class EmailConfirmationCodeService {
  async create(email: string): Promise<EmailConfirmationCode> {
    const confirmation = await EmailConfirmationCode.create({
      email,
      code: generateTempPassword()
    });

    return confirmation.toJSON() as EmailConfirmationCode;
  }

  async codeIsValid(email: string, code: string): Promise<boolean> {
    var count = await EmailConfirmationCode.count({
      where: {
        email,
        code
      }
    });

    return count > 0;
  }

  async deleteByEmail(email: string): Promise<void> {
    await EmailConfirmationCode.destroy({
      where: {
        email
      }
    });
  }
}

export default new EmailConfirmationCodeService();
