import CalendarClass from '../../../database/models/CalendarClass'

export class GetModel {
  handle(id: string) {
    return CalendarClass.findByPk(id, {
      include: this.getIncludes()
    })
  }

  getIncludes() {
    return [
      { association: 'calendar', attributes: ['id', 'name'] },
      { association: 'activity', attributes: ['id', 'name', 'duration'] }
    ]
  }

  map(item: CalendarClass) {
    return {
      id: item.id,
      dateStart: item.dateStart,
      dateEnd: item.dateEnd,
      slots: item.slots,
      color: item.color,
      calendarId: item.calendarId,
      activityId: item.activityId,
      calendar: item.calendar,
      activity: item.activity,
      notes: item.notes,
      recurrenceRule: item.recurrenceRule,
      recurrenceExceptions: JSON.parse(item.recurrenceExceptions || '[]')
    }
  }
}
