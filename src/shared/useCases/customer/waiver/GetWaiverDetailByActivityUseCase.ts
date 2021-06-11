import Activity from '../../../database/models/Activity';
import CustomerWaiver from '../../../database/models/CustomerWaiver';

interface Result {
  id: number;
  title: string;
  customerHasSign: boolean;
  customerHasWaiver: boolean;
}

export class GetWaiverDetailByActivityUseCase {
  async handle(customerId, activityId): Promise<Result> {
    const { waiver } = await Activity.findByPk(activityId, {
      attributes: [],
      include: 'waiver'
    });

    if (!waiver) return null;

    const customerWaiver = await CustomerWaiver.findOne({
      attributes: ['id', 'signedAt'],
      where: { customerId, waiverId: waiver.id }
    });

    return {
      id: waiver.id,
      title: waiver.title,
      customerHasWaiver: Boolean(customerWaiver),
      customerHasSign: Boolean(customerWaiver?.signedAt)
    };
  }
}
