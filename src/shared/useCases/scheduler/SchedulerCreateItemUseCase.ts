import CalendarAppointment from '../../database/models/CalendarAppointment'
import Activity from '../../database/models/Activity'

import { addMinutes } from '../../utils/date-utils'

import { createItemSchema } from './schema'

export class SchedulerCreateItemUseCase {
  async handle(data) {
    const validData = await createItemSchema.validateAsync(data)
    const dateEnd = await this.calculateDateEnd(validData)
    const model = await CalendarAppointment.create({ ...validData, dateEnd })

    await model.reload({
      include: [
        { association: 'calendar', attributes: ['id', 'name'] },
        { association: 'activity', attributes: ['id', 'name', 'duration'] },
        { association: 'customer', attributes: ['id', 'name'] },
        { association: 'label', attributes: ['id', 'name', 'color'] }
      ]
    })

    return model
  }

  async calculateDateEnd({ dateStart, activityId }) {
    const { duration } = await Activity.findByPk(activityId)
    return addMinutes(new Date(dateStart), duration)
  }
}
