import Model from '../../../database/models/CalendarSlot';

export class CalendarSlotListUseCase {
  async list(calendarId) {
    const dbList = await Model.findAll({
      where: { calendarId }
    });

    return dbList.map(this.parse);
  }

  private parse(item: Model) {
    return {
      id: item.id,
      start: item.start,
      end: item.end,
      recurrenceRule: item.recurrenceRule,
      recurrenceExceptions: JSON.parse(item.recurrenceExceptions || '[]'),
      status: item.status
    };
  }
}
