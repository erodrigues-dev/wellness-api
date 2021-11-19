import CustomError from '../../../custom-error/CustomError';
import Activity from '../../../database/models/Activity';
import CustomerWaiver from '../../../database/models/CustomerWaiver';

export class CheckWaiverSignatureUseCase {
  async check(customerId: number, activityId: number) {
    const { waiverId } = await Activity.findByPk(activityId, {
      attributes: ['waiverId']
    });

    if (!waiverId) return;

    const isSigned = await this.isSigned(customerId, waiverId);
    if (!isSigned) throw new CustomError('Signature of waiver is required.');
  }

  async isSigned(customerId: number, waiverId: number) {
    const customerWaiver = await CustomerWaiver.findOne({
      where: {
        customerId,
        waiverId
      }
    });

    return Boolean(customerWaiver?.signedAt);
  }
}
