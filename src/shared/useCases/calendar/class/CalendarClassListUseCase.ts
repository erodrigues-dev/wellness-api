import { literal, Op } from 'sequelize'
import CalendarClass from '../../../database/models/CalendarClass'
import CalendarEntry from '../../../database/models/CalendarEntry'
import { getDate } from '../../../utils/date-utils'
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

    return [...byDate, ...recurrence]
  }

  async queryByDate(data: Props) {
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

    return list
  }

  async queryRecurrences(data: Props) {
    const list = await CalendarClass.findAll({
      where: {
        recurrenceRule: { [Op.not]: null }
      }
    })

    return list
  }
}
