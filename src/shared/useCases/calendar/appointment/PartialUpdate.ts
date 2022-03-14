import { NotFoundError } from '../../../custom-error'
import CalendarAppointment from '../../../database/models/CalendarAppointment'
import { GetModel } from './GetModel'
import { partialUpdateSchema } from './schema'

interface Data {
  id: string
  notes: string
  calendarLabelId: string
}

export class CalendarAppointmentPartialUpdateUseCase {
  constructor(private shema = partialUpdateSchema, private getModel = new GetModel()) {}

  async handle(data: Data) {
    await this.shema.validateAsync(data)
    await this.save(data)
    const model = await this.getModel.handle(data.id)
    if (!model) throw new NotFoundError('Appointment not found')
    return this.getModel.map(model)
  }

  private async save({ id, ...data }: Data) {
    await CalendarAppointment.update(data, {
      where: { id },
      fields: ['notes', 'calendarLabelId']
    })
  }
}
