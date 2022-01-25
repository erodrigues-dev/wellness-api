import { Op, literal } from 'sequelize';
import CalendarEntry from '../../../database/models/CalendarEntry';
import { schedulerSchema } from './schema';

export class CalendarEntrySchedulerDataUseCase {
  async getData(data) {
    const validData = this.validate(data);
    return this.query(validData);
  }

  private async query({ calendars, date }) {
    const [dateOnly] = date.split('T');

    const list = await CalendarEntry.findAll({
      where: {
        [Op.and]: [{ calendarId: { [Op.in]: calendars } }, literal(`date_trunc('day', "date_time") = '${dateOnly}'`)]
      }
    });

    return list;
  }

  private validate(data) {
    const result = schedulerSchema.validate(data);

    if (result.error) throw result.error;

    return result.value;
  }
}
