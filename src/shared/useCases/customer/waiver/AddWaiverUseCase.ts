import CustomError from '../../../custom-error/CustomError';
import CustomerWaiver from '../../../database/models/CustomerWaiver';

export class AddWaiverUseCase {
  constructor(private customerId: number, private waiverId: number) {}

  async handle() {
    if (await this.hasWaiver()) throw new CustomError('Customer already has this waiver');

    await this.addWaiver();
  }

  private async hasWaiver() {
    const count = await CustomerWaiver.count({
      where: { customerId: this.customerId, waiverId: this.waiverId }
    });

    return count > 0;
  }

  private async addWaiver() {
    CustomerWaiver.create({
      customerId: this.customerId,
      waiverId: this.waiverId
    });
  }
}
