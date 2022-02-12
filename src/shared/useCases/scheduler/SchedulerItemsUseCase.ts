import { Op, literal } from 'sequelize';
import CalendarEntry from '../../database/models/CalendarEntry';
import { itemsSchema } from './schema';

export class SchedulerItemsUseCase {
  async list(data) {
    const validData = this.validate(data);
    return this.query(validData);
  }

  private async query({ calendars, date }) {
    const [dateOnly] = date.split('T');

    const list = await CalendarEntry.findAll({
      attributes: {
        exclude: ['activityId', 'customerId', 'createdAt', 'updatedAt']
      },
      include: [
        {
          association: 'activity',
          attributes: ['id', 'name']
        },
        {
          association: 'customer',
          attributes: ['id', 'name']
        }
      ],
      where: {
        [Op.and]: [{ calendarId: { [Op.in]: calendars } }, literal(`date_trunc('day', "date_start") = '${dateOnly}'`)]
      }
    });

    return list;
  }

  private validate(data) {
    const result = itemsSchema.validate(data);

    if (result.error) throw result.error;

    return result.value;
  }
}
