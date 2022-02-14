import { Op, literal } from 'sequelize';
import CalendarEntry from '../../database/models/CalendarEntry';
import { itemsSchema } from './schema';

export class SchedulerListItemsUseCase {
  async list(data) {
    const validData = this.validate(data);
    return this.query(validData);
  }

  private async query({ calendars, date }) {
    const [dateOnly] = date.split('T');

    const list = await CalendarEntry.findAll({
      attributes: {
        exclude: ['activityId', 'customerId', 'labelId', 'createdAt', 'updatedAt']
      },
      include: [
        {
          association: 'activity',
          attributes: ['id', 'name']
        },
        {
          association: 'customer',
          attributes: ['id', 'name']
        },
        {
          association: 'label',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ],
      where: {
        [Op.and]: [
          { calendarId: { [Op.in]: calendars } },
          literal(`date_trunc('day', "date_start") = '${dateOnly}'`),
          { canceledAt: { [Op.is]: null } }
        ]
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
