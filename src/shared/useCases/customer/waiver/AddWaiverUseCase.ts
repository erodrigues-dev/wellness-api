import CustomError from '../../../custom-error/CustomError';
import CustomerWaiver from '../../../database/models/CustomerWaiver';

export class AddWaiverUseCase {
  async handle(customerId: number, waiverId: number) {
    if (await this.hasWaiver(customerId, waiverId)) throw new CustomError('Customer already has this waiver');

    await this.addWaiver(customerId, waiverId);
  }

  private async hasWaiver(customerId: number, waiverId: number) {
    const count = await CustomerWaiver.count({
      where: { customerId, waiverId }
    });

    return count > 0;
  }

  private async addWaiver(customerId: number, waiverId: number) {
    CustomerWaiver.create({ customerId, waiverId });
  }
}
