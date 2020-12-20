import { Op } from 'sequelize';

import Order from '../../database/models/Order';
import { SquareSubscription } from '../../square/models/SquareSubscription';
import { SquareWebhook } from '../../square/models/SquareWebhook';

export class UpdateSubscriptionStatusUseCase {
  constructor(private hookData: SquareWebhook<SquareSubscription>) {}

  async update() {
    if (this.hookData.type === 'subscription.updated') {
      const [udpates] = await Order.update(
        {
          status: this.hookData.data.object.subscription.status,
          webhookDate: this.hookData.created_at,
          paidUntilDate: this.hookData.data.object.subscription.paid_until_date
        },
        {
          where: {
            transactionId: this.hookData.data.id,
            webhookDate: { [Op.lt]: this.hookData.created_at }
          }
        }
      );

      console.log(`
        event: subscription.updated
        created_at: ${this.hookData.created_at}
        status: ${this.hookData.data.object.subscription.status}
        updateRows: ${udpates}
      `);
    }
  }
}
