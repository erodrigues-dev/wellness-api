import Activity from '../../../database/models/Activity'
import CalendarClass from '../../../database/models/CalendarClass'

import { parseISO, addMinutes } from '../../../utils/date-utils'

import { storeSchema } from './schema'
import { GetModel } from './GetModel'

interface Data {
  calendarId: string
  activityId: number
  dateStart: string
  slots: number
  recurrenceRule: string
  recurrenceExceptions: string
  color: string
  notes: string
}

export class CalendarClassCreateUseCase {
  private getModel: GetModel

  constructor() {
    this.getModel = new GetModel()
  }

  async handle(data: Data) {
    await this.validate(data)
    const dateEnd = await this.calculateEndDate(data)
    const { id } = await CalendarClass.create({ ...data, dateEnd })
    return this.getModel.handle(id)
  }

  async validate(data: Data) {
    await storeSchema.validateAsync(data)
  }

  async save(data) {
    const endDate = await this.calculateEndDate(data)
    const model = await CalendarClass.create({ ...data, endDate })
    await model.reload({
      include: [
        { association: 'calendar', attributes: ['id', 'name'] },
        { association: 'activity', attributes: ['id', 'name', 'duration'] }
      ]
    })
    return model
  }

  async calculateEndDate({ activityId, dateStart }: Data) {
    const { duration } = await Activity.findByPk(activityId, { attributes: ['duration'] })
    const date = parseISO(dateStart)
    return addMinutes(date, duration)
  }
}
