import { fn, literal, Op } from 'sequelize'
import CalendarSlot from '../../../database/models/CalendarSlot'
import { getDate } from '../../../utils/date-utils'
import { RecurrenceUtil } from '../../../utils/RecurrenceUtil'
import { GetModel } from '../slots/GetModel'

interface Data {
  calendars: string[]
  date: string
}

export class SchedulerListSlotUseCase {
  constructor(
    private getModel = new GetModel(),
    private recurrenceUtil = new RecurrenceUtil()
  ) {}

  async handle(data: Data) {
    const [byDate, recurrents] = await Promise.all([
      this.queryByDate(data),
      this.queryRecurrentItems(data)
    ])

    return [...byDate, ...recurrents].map(item => this.getModel.map(item))
  }

  private async queryByDate(data: Data) {
    const dateOnly = getDate(data.date)
    const dbList = await CalendarSlot.findAll({
      where: {
        [Op.and]: [
          {
            calendarId: { [Op.in]: data.calendars },
            recurrenceRule: { [Op.is]: null }
          },
          literal(`date_trunc('day', "CalendarSlot"."start") = '${dateOnly}'`)
        ]
      },
      include: this.getModel.getIncludes()
    })

    return dbList
  }

  private async queryRecurrentItems(data: Data) {
    const dbList = await CalendarSlot.findAll({
      where: {
        calendarId: { [Op.in]: data.calendars },
        start: { [Op.lte]: data.date },
        recurrenceRule: { [Op.not]: null }
      },
      include: this.getModel.getIncludes()
    })

    return dbList.filter(item =>
      this.recurrenceUtil.hasDateInRecurrence({
        rrule: item.recurrenceRule,
        exceptions: item.recurrenceExceptions,
        date: data.date
      })
    )
  }
}
