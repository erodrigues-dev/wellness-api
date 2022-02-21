import CalendarAppointment from '../../../database/models/CalendarAppointment'
import Activity from '../../../database/models/Activity'

import { addMinutes } from '../../../utils/date-utils'

import { updateItemSchema } from './schema'

export class SchedulerUpdateItemUseCase {
  async handle(updateData) {
    const { id, ...data } = await updateItemSchema.validateAsync(updateData)
    const dateEnd = await this.calculateDateEnd(data)
    const model = await CalendarAppointment.update(
      { ...data, dateEnd },
      { where: { id } }
    )
    return model
  }

  async calculateDateEnd({ dateStart, activityId }) {
    const { duration } = await Activity.findByPk(activityId)
    return addMinutes(new Date(dateStart), duration)
  }
}
