import CalendarClassAppointment from '../../../database/models/CalendarClassAppointment'
import { NotFoundError } from '../../../custom-error/NotFoundError'

export class CalendarClassAppointmentCancelUseCase {
  async handle(id) {
    const count = await CalendarClassAppointment.destroy({
      where: { id }
    })

    if (count === 0) throw new NotFoundError('Class appointment not found')
  }
}
