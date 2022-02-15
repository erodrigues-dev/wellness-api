import { literal, Op } from 'sequelize'
import CalendarClass from '../../../database/models/CalendarClass'
import CalendarEntry from '../../../database/models/CalendarEntry'
import { getDate } from '../../../utils/date-utils'

interface Props {
  date: string
  calendars: string[]
}

export class CalendarClassListUseCase {
  async handle(data: Props) {
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
          literal(`date_trunc('day', "date_start") = '${date}'`),
          { recurrenceRule: { [Op.is]: null } }
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
