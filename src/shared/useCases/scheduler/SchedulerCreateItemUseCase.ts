import CalendarEntry from '../../database/models/CalendarEntry'
import Activity from '../../database/models/Activity'

import { addMinutes } from '../../utils/date-utils'

import { addItemSchema } from './schema'

export class SchedulerCreateItemUseCase {
  async handle(data) {
    const validData = await addItemSchema.validateAsync(data)
    const dateEnd = await this.calculateDateEnd(validData)
    const model = await CalendarEntry.create({ ...validData, dateEnd })
    return model
  }

  async calculateDateEnd({ dateStart, activityId }) {
    const { duration } = await Activity.findByPk(activityId)
    return addMinutes(new Date(dateStart), duration)
  }
}
