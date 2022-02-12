import { Op } from 'sequelize';
import Model from '../../database/models/CalendarSlot';

export class SchedulerSlotUseCase {
  async list(calendars) {
    const dbList = await Model.findAll({
      where: {
        calendarId: { [Op.in]: calendars }
      }
    });

    return dbList.map(this.parse);
  }

  private parse(item: Model) {
    return {
      id: item.id,
      calendarId: item.calendarId,
      start: item.start,
      end: item.end,
      recurrenceRule: item.recurrenceRule,
      recurrenceExceptions: JSON.parse(item.recurrenceExceptions || '[]'),
      status: item.status
    };
  }
}
