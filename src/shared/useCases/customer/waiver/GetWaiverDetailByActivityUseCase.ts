import Activity from '../../../database/models/Activity';
import CustomerWaiver from '../../../database/models/CustomerWaiver';

interface Result {
  id: number;
  title: string;
  signedAt?: Date;
  signedUrl?: string;
}

export class GetWaiverDetailByActivityUseCase {
  async handle(customerId, activityId): Promise<Result> {
    const { waiver } = await Activity.findByPk(activityId, {
      attributes: [],
      include: 'waiver'
    });

    if (!waiver) return null;

    const customerWaiver = await CustomerWaiver.findOne({
      where: { customerId, waiverId: waiver.id }
    });

    return {
      id: waiver.id,
      title: waiver.title,
      signedAt: customerWaiver?.signedAt,
      signedUrl: customerWaiver?.signedUrl
    };
  }
}
