import { Op, fn } from 'sequelize';
import { ScheduleCreateUseCase } from './ScheduleCreateUseCase';
import OrderActivity from '../../database/models/OrderActivity';
import { PAID_STATUS } from '../../models/enums';

export class ScheduleCreateChooseBetterOrderUseCase {
  constructor(private customerId: number, private activityId: number, private slotId: number, private date: Date) {}

  async handle() {
    const orderActivityId = await this.getOrderActivityId();
    await new ScheduleCreateUseCase(this.customerId, orderActivityId, this.slotId, this.date).create();
  }

  private async getOrderActivityId() {
    const ids = await this.listOrderActivityIds();
    for (const orderActivityId of ids) {
      try {
        await new ScheduleCreateUseCase(this.customerId, orderActivityId, this.slotId, this.date).checkOrderAvailable(
          orderActivityId
        );
        return orderActivityId;
      } catch (error) {
        continue;
      }
    }
  }

  private async listOrderActivityIds() {
    const data = await OrderActivity.findAll({
      attributes: ['id'],
      include: [
        {
          association: 'orderPackage',
          attributes: []
        },

        {
          association: 'order',
          attributes: []
        }
      ],
      where: {
        activityId: this.activityId,
        ['$order.customer_id$']: this.customerId,
        ['$order.paid_until_date$']: {
          [Op.or]: [{ [Op.is]: null }, { [Op.gt]: fn('now') }]
        },
        ['$order.status$']: { [Op.in]: PAID_STATUS },
        ['$orderPackage.expiration$']: {
          [Op.or]: [{ [Op.is]: null }, { [Op.gt]: fn('now') }]
        }
      }
    });

    return data.map(x => x.id);
  }
}
