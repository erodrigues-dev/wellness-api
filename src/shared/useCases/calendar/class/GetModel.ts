import { literal } from 'sequelize'
import CalendarClass from '../../../database/models/CalendarClass'
import { getDate } from '../../../utils/date-utils'

export class GetModel {
  async handle(id: string) {
    const model = await CalendarClass.findByPk(id, {
      include: this.getIncludes()
    })
    return this.map(model)
  }

  getIncludes() {
    return [
      { association: 'calendar', attributes: ['id', 'name'] },
      { association: 'activity', attributes: ['id', 'name', 'duration'] }
    ]
  }

  getIncludesWithAppointments() {
    return [
      { association: 'calendar', attributes: ['id', 'name'] },
      { association: 'activity', attributes: ['id', 'name', 'duration'] },
      {
        association: 'appointments',
        attributes: ['id'],
        required: false
      }
    ]
  }

  map(item: CalendarClass) {
    return {
      id: item.id,
      dateStart: item.dateStart,
      dateEnd: item.dateEnd,
      slots: item.slots,
      reservedSlots: item.appointments?.length,
      color: item.color,
      calendarId: item.calendarId,
      activityId: item.activityId,
      calendar: item.calendar,
      activity: item.activity,
      notes: item.notes,
      recurrenceRule: item.recurrenceRule,
      recurrenceId: item.recurrenceId
    }
  }
}
