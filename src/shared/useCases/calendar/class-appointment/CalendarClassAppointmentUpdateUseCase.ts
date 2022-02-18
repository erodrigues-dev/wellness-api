import CalendarClass from '../../../database/models/CalendarClass'
import CalendarClassAppointment from '../../../database/models/CalendarClassAppointment'
import { updateSchema } from './schema'
import { parseISO, addMinutes } from '../../../utils/date-utils'
import { NotFoundError } from '../../../custom-error'

export class CalendarClassAppointmentUpdateUseCase {
  async handle(data) {
    await this.validate(data)
    await this.save(data)
  }

  async validate(data) {
    await updateSchema.validateAsync(data)
  }

  private async save({ id, ...data }: any) {
    const dateEnd = await this.calculateDateEnd(data)
    const updateData = { ...data, dateEnd }
    const [count] = await CalendarClassAppointment.update(updateData, { where: { id } })

    if (count === 0) throw new NotFoundError('Class appointment not found')
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
