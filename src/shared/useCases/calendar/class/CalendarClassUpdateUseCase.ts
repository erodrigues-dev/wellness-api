import Activity from '../../../database/models/Activity'
import CalendarClass from '../../../database/models/CalendarClass'
import { addMinutes, parseISO } from '../../../utils/date-utils'

import { updateSchema } from './calendar-class-schema'

export class CalendarClassUpdateUseCase {
  async handle(data: any) {
    await this.validate(data)
    return this.save(data)
  }

  validate(data: any) {
    return updateSchema.validateAsync(data)
  }

  private async save({ id, ...data }) {
    const endDate = await this.calculateEndDate(data)
    await CalendarClass.update({ ...data, endDate }, { where: { id } })

    return CalendarClass.findByPk(id, {
      include: [
        { association: 'calendar', attributes: ['id', 'name'] },
        { association: 'activity', attributes: ['id', 'name', 'duration'] }
      ]
    })
  }

  private async calculateEndDate({ activityId, dateStart }: any) {
    const { duration } = await Activity.findByPk(activityId, { attributes: ['duration'] })
    const date = parseISO(dateStart)
    return addMinutes(date, duration)
  }
}
