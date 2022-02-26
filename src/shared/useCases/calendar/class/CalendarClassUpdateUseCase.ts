import Activity from '../../../database/models/Activity'
import CalendarClass from '../../../database/models/CalendarClass'
import { addMinutes, parseISO } from '../../../utils/date-utils'

import { updateSchema } from './calendar-class-schema'
import { GetModel } from './GetModel'

export class CalendarClassUpdateUseCase {
  private getModel = new GetModel()

  async handle(data: any) {
    await this.validate(data)
    await this.save(data)
    return this.getModel.handle(data.id)
  }

  validate(data: any) {
    return updateSchema.validateAsync(data)
  }

  private async save({ id, ...data }) {
    const endDate = await this.calculateEndDate(data)
    await CalendarClass.update({ ...data, endDate }, { where: { id } })
  }

  private async calculateEndDate({ activityId, dateStart }: any) {
    const { duration } = await Activity.findByPk(activityId, { attributes: ['duration'] })
    const date = parseISO(dateStart)
    return addMinutes(date, duration)
  }
}
