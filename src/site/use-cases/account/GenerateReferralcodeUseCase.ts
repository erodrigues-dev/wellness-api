import Customer from '../../../shared/database/models/Customer';
import { generateRandomCode } from '../../../shared/utils/hash-password';

export class GenerateReferralCodeUseCase {
  async generate(accountId: number) {
    const account = await Customer.findByPk(accountId);
    const code = generateRandomCode(8);

    if (!account.referralCode) {
      account.referralCode = code;
      await account.save();
    }

    return account.referralCode;
  }
}
