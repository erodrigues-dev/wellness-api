import { Op } from 'sequelize'
import CalendarAppointment from '../../../database/models/CalendarAppointment'
import { checkAvailabilitySchema } from './schema'

interface CheckAvailabilityData {
  calendarId: string
  activityId: number
  date: string
}

export class CalendarCheckAvailabilityUseCase {
  async handle(data: CheckAvailabilityData) {
    await this.validate(data)
    const isFree = await this.isFree(data)
    return { isFree }
  }

  private async validate(data: CheckAvailabilityData) {
    await checkAvailabilitySchema.validateAsync(data)
  }

  private async isFree(data: CheckAvailabilityData) {
    const count = await CalendarAppointment.count({
      where: {
        calendarId: data.calendarId,
        activityId: data.activityId,
        dateStart: { [Op.lte]: data.date },
        dateEnd: { [Op.gte]: data.date },
        calendarClassId: { [Op.is]: null }
      }
    })

    return count === 0
  }
}
