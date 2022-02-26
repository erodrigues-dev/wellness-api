import { Op } from 'sequelize'
import Model from '../../../database/models/CalendarSlot'
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
    const dbList = await Model.findAll({
      where: {
        calendarId: { [Op.in]: data.calendars }
      },
      include: this.getModel.getIncludes()
    })

    return dbList
      .filter(item =>
        this.recurrenceUtil.hasDateInRecurrence({
          rrule: item.recurrenceRule,
          exceptions: item.recurrenceExceptions,
          date: data.date
        })
      )
      .map(item => this.getModel.map(item))
  }
}
