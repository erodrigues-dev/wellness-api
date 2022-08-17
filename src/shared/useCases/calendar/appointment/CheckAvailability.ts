import { Op } from 'sequelize'
import CalendarAppointment from '../../../database/models/CalendarAppointment'
import { addMinutes, parseISO } from '../../../utils/date-utils'
import { CalculateDateEnd } from '../shared/CalculateDateEnd'
import { checkAvailabilitySchema } from './schema'

interface CheckAvailabilityData {
  calendarId: string
  activityId: number
  ignoreAppointmentId: string
  date: string
}

export class CalendarCheckAvailabilityUseCase {
  private calculateDateEnd = new CalculateDateEnd()

  async handle(data: CheckAvailabilityData) {
    await this.validate(data)
    const isFree = await this.isFree(data)
    return { isFree }
  }

  private async validate(data: CheckAvailabilityData) {
    await checkAvailabilitySchema.validateAsync(data)
  }

  private async isFree(data: CheckAvailabilityData) {
    const dateStart = parseISO(data.date)
    const dateEnd = await this.calculateDateEnd.calculate({
      dateStart: data.date,
      activityId: data.activityId
    })

    const where = {
      [Op.and]: [
        {
          calendarId: data.calendarId,
          calendarClassId: { [Op.is]: null }
        },
        {
          [Op.or]: [
            {
              dateStart: { [Op.gt]: dateStart },
              dateEnd: { [Op.lt]: dateEnd }
            },
            {
              dateStart: { [Op.lt]: dateStart },
              dateEnd: { [Op.gt]: dateStart }
            },
            {
              dateStart: { [Op.lt]: dateEnd },
              dateEnd: { [Op.gt]: dateEnd }
            }
          ]
        }
      ]
    } as any

    if (data.ignoreAppointmentId) where.id = { [Op.ne]: data.ignoreAppointmentId }

    const count = await CalendarAppointment.count({ where })

    return count === 0
  }
}
