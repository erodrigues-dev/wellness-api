import { Op, fn } from 'sequelize';
import OrderActivity from '../../../shared/database/models/OrderActivity';
import Event from '../../../shared/database/models/Event';
import { PAID_STATUS } from '../../../shared/models/enums';
import { ScheduleCreateUseCase } from '../../../shared/useCases/schedule';

interface Data {
  user_id: number;
  activity_id: number;
  slot_id: number;
  date: Date;
}

export class BookUseCase {
  async handle(data: Data): Promise<void> {
    const orderActivityId = await this.getOrderActivityId(data);
    await new ScheduleCreateUseCase(data.user_id, orderActivityId, data.slot_id, data.date).create();
  }

  private async getOrderActivityId({ user_id, activity_id, slot_id, date }: Data) {
    const ids = await this.listOrderActivityIds(user_id, activity_id);
    for (const orderActivityId of ids) {
      try {
        await new ScheduleCreateUseCase(user_id, orderActivityId, slot_id, date).checkOrderAvailable(orderActivityId);
        return orderActivityId;
      } catch (error) {
        continue;
      }
    }
  }

  private async listOrderActivityIds(userId: number, activityId: number) {
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
        activityId,
        ['$order.customer_id$']: userId,
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

  private getSlot(id: number) {
    return Event.findByPk(id);
  }
}
