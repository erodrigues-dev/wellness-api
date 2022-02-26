import { rrulestr } from 'rrule'
import { NotFoundError } from '../../../custom-error'
import CalendarSlot from '../../../database/models/CalendarSlot'
import { isSameDay, parseISO, startOfDay } from '../../../utils/date-utils'

export class GetModel {
  async handle(id: string): Promise<any> {
    const model = await CalendarSlot.findByPk(id, {
      include: this.getIncludes()
    })

    if (!model) throw new NotFoundError()

    return this.map(model)
  }

  getIncludes() {
    return [
      {
        association: 'calendar',
        attributes: ['id', 'name']
      }
    ]
  }

  map(item: CalendarSlot) {
    return {
      id: item.id,
      status: item.status,
      dateStart: item.start,
      dateEnd: item.end,
      calendarId: item.calendarId,
      calendar: item.calendar,
      recurrenceRule: item.recurrenceRule,
      recurrenceExceptions: JSON.parse(item.recurrenceExceptions || '[]') as string[]
    }
  }
}
