import Activity from '../../../database/models/Activity'
import CalendarClass from '../../../database/models/CalendarClass'
import { addMinutes, parseISO } from '../../../utils/date-utils'

import { updateSchema } from './schema'
import { GetModel } from './GetModel'

interface Data {
  id: string
  calendarId: string
  activityId: number
  dateStart: string
  slots: number
  recurrenceRule: string
  color: string
  notes: string
}

export class CalendarClassUpdateUseCase {
  private getModel = new GetModel()

  async handle(data: Data) {
    await this.validate(data)
    await this.save(data)
    const model = await this.getModel.handle(data.id)
    return this.getModel.map(model)
  }

  validate(data: Data) {
    return updateSchema.validateAsync(data)
  }

  private async save({ id, ...data }: Data) {
    const endDate = await this.calculateEndDate(data)
    await CalendarClass.update({ ...data, endDate }, { where: { id } })
  }

  private async calculateEndDate({ activityId, dateStart }) {
    const { duration } = await Activity.findByPk(activityId, { attributes: ['duration'] })
    const date = parseISO(dateStart)
    return addMinutes(date, duration)
  }
}
