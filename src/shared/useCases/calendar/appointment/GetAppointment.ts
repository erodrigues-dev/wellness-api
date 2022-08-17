import { NotFoundError } from '../../../custom-error'
import { GetModel } from './GetModel'

export class CalendarGetAppointmentUseCase {
  async handle(id) {
    const model = await new GetModel().handle(id)
    if (!model) throw new NotFoundError('Appointment not found')
    return model
  }
}
