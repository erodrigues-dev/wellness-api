import { literal, Op } from 'sequelize'
import { rrulestr } from 'rrule'

import CalendarClass from '../../../database/models/CalendarClass'
import CalendarAppointment from '../../../database/models/CalendarAppointment'
import { getDate, parseISO, startOfDay, isSameDay } from '../../../utils/date-utils'
import { listSchema } from './calendar-class-schema'
import { GetModel } from './GetModel'
import { RecurrenceUtil } from '../../../utils/RecurrenceUtil'

interface Props {
  date: string
  calendars: string[]
}

export class CalendarClassListUseCase {
  constructor(
    private getModel = new GetModel(),
    private recurrenceUtil = new RecurrenceUtil()
  ) {}

  async handle(data: Props) {
    await listSchema.validateAsync(data)

    const [byDate, byRecurrence] = await Promise.all([
      this.queryByDate(data),
      this.queryRecurrences(data)
    ])

    const all = [...byDate, ...byRecurrence]

    return all.map(item => this.map(item))
  }

  private async queryByDate(data: Props) {
    const date = getDate(data.date)
    const list = await CalendarClass.findAll({
      where: {
        [Op.and]: [
          { calendarId: { [Op.in]: data.calendars } },
          { recurrenceRule: { [Op.is]: null } },
          literal(`date_trunc('day', "CalendarClass"."date_start") = '${date}'`)
        ]
      },
      include: this.getIncludes(data.date)
    })

    return list.map(item => item.toJSON())
  }

  private async queryRecurrences(data: Props) {
    const list = await CalendarClass.findAll({
      where: {
        [Op.and]: [
          { recurrenceRule: { [Op.not]: null } },
          literal(`date_trunc('day', "CalendarClass"."date_start") <= '${data.date}'`)
        ]
      },
      include: this.getIncludes(data.date)
    })

    return list
      .map(item => item.toJSON())
      .filter(item =>
        this.recurrenceUtil.hasDateInRecurrence({
          rrule: item.recurrenceRule,
          exceptions: item.recurrenceExceptions,
          date: data.date
        })
      )
  }

  private getIncludes(date: string) {
    const dateOnly = getDate(date)
    return [
      { association: 'calendar', attributes: ['id', 'name'] },
      { association: 'activity', attributes: ['id', 'name', 'duration'] },
      {
        association: 'appointments',
        attributes: ['id'],
        where: literal(`date_trunc('day', "appointments"."date_start") = '${dateOnly}'`),
        required: false
      }
    ]
  }

  private map(item: CalendarClass) {
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
      recurrenceExceptions: JSON.parse(item.recurrenceExceptions || '[]')
    }
  }
}
