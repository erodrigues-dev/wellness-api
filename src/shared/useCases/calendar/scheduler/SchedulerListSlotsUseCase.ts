import { Op } from 'sequelize'
import Model from '../../../database/models/CalendarSlot'
import { GetModel } from '../slots/GetModel'

interface Data {
  calendars: string[]
  date: string
}

export class SchedulerListSlotUseCase {
  constructor(private getModel = new GetModel()) {}

  async handle(data: Data) {
    const dbList = await Model.findAll({
      where: {
        calendarId: { [Op.in]: data.calendars }
      },
      include: this.getModel.getIncludes()
    })

    return dbList
      .filter(item => this.getModel.checkDateInRecurrence(item, data.date))
      .map(this.getModel.map)
  }
}
