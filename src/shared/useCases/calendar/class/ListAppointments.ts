import CalendarAppointment from '../../../database/models/CalendarAppointment'
import { listAppointmentsSchema } from './schema'

interface Data {
  id: string
}

export class CalendarClassListAppointmentsUseCase {
  constructor(private schema = listAppointmentsSchema) {}

  async handle(data: Data) {
    await this.validate(data)
    return this.query(data.id)
  }

  private async validate(data: Data) {
    await this.schema.validateAsync(data)
  }

  private async query(id: string) {
    const list = await CalendarAppointment.findAll({
      where: {
        calendarClassId: id
      },
      include: [
        { association: 'customer', attributes: ['id', 'name'] },
        { association: 'calendarLabel', attributes: ['id', 'name', 'color'] }
      ],
      attributes: ['id', 'notes']
    })

    return list.map(item => this.map(item))
  }

  private map(item: CalendarAppointment) {
    return {
      id: item.id,
      customer: item.customer,
      calendarLabel: item.calendarLabel,
      notes: item.notes
    }
  }
}
