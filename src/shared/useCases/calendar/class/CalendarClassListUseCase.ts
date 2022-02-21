import { literal, Op } from 'sequelize'
import { rrulestr } from 'rrule'

import CalendarClass from '../../../database/models/CalendarClass'
import CalendarAppointment from '../../../database/models/CalendarAppointment'
import { getDate, parseISO, startOfDay, isSameDay } from '../../../utils/date-utils'
import { listSchema } from './calendar-class-schema'

interface Props {
  date: string
  calendars: string[]
}

export class CalendarClassListUseCase {
  async handle(data: Props) {
    await listSchema.validateAsync(data)

    const [byDate, recurrence] = await Promise.all([
      this.queryByDate(data),
      this.queryRecurrences(data)
    ])

    const all = [...byDate, ...recurrence]

    // TODO: calcular appointments/slots

    return all
  }

  private async queryByDate(data: Props) {
    const date = getDate(data.date)
    const list = await CalendarClass.findAll({
      where: {
        [Op.and]: [
          { calendarId: { [Op.in]: data.calendars } },
          { recurrenceRule: { [Op.is]: null } },
          literal(`date_trunc('day', "date_start") = '${date}'`)
        ]
      }
    })

    return list.map(item => item.toJSON())
  }

  private async queryRecurrences(data: Props) {
    const list = await CalendarClass.findAll({
      where: {
        [Op.and]: [
          { recurrenceRule: { [Op.not]: null } },
          literal(`date_trunc('day', "date_start") <= '${data.date}'`)
        ]
      }
    })

    return list
      .map(item => item.toJSON())
      .filter(current => this.hasDateInRecurrence(current, data.date))
  }

  private hasDateInRecurrence(calendarClass: CalendarClass, date: string): boolean {
    const { recurrenceRule, recurrenceExceptions } = calendarClass
    const dateOnly = startOfDay(parseISO(date))

    if (this.isExceptionDate(recurrenceExceptions, dateOnly)) {
      return false
    }

    return this.dateInRecurrenceRule(recurrenceRule, dateOnly)
  }

  private isExceptionDate(recurrenceExceptions, date) {
    const exceptions = JSON.parse(recurrenceExceptions || '[]').map(exceptionDate =>
      parseISO(exceptionDate)
    ) as Date[]

    return exceptions.some(exceptionDate => isSameDay(date, exceptionDate))
  }

  private dateInRecurrenceRule(recurrenceRule: string, date: Date) {
    const rule = rrulestr(recurrenceRule)
    const dateInclude = rule.after(date, true)

    return Boolean(dateInclude)
  }
}
