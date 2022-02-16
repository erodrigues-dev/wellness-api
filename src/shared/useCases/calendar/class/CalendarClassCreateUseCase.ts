import Activity from '../../../database/models/Activity'
import CalendarClass from '../../../database/models/CalendarClass'

import { parseISO, addMinutes } from '../../../utils/date-utils'

import { storeSchema } from './calendar-class-schema'

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
  async handle(data: Data) {
    await this.validate(data)
    const dateEnd = await this.calculateEndDate(data)
    return CalendarClass.create({ ...data, dateEnd })
  }

  async validate(data: Data) {
    await storeSchema.validateAsync(data)
  }

  async calculateEndDate({ activityId, dateStart }: Data) {
    const { duration } = await Activity.findByPk(activityId, { attributes: ['duration'] })
    const date = parseISO(dateStart)
    return addMinutes(date, duration)
  }
}
