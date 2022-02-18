import CalendarClass from '../../../database/models/CalendarClass'
import CalendarClassAppointment from '../../../database/models/CalendarClassAppointment'
import { createSchema } from './schema'
import { parseISO, addMinutes } from '../../../utils/date-utils'

export class CalendarClassAppointmentCreateUseCase {
  async handle(data) {
    await this.validate(data)
    return this.save(data)
  }

  async validate(data) {
    await createSchema.validateAsync(data)
  }

  private async save(data) {
    const dateEnd = await this.calculateDateEnd(data)
    const createData = { ...data, dateEnd }
    const model = await CalendarClassAppointment.create(createData)
    return model.toJSON()
  }

  private async calculateDateEnd({ calendarClassId, dateStart }) {
    const {
      activity: { duration }
    } = await CalendarClass.findByPk(calendarClassId, {
      attributes: [],
      include: { association: 'activity', attributes: ['duration'] }
    })

    const date = parseISO(dateStart)
    return addMinutes(date, duration)
  }
}
