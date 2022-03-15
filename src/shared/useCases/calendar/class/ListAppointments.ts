import { literal, Op } from 'sequelize'
import CalendarAppointment from '../../../database/models/CalendarAppointment'
import { getDate } from '../../../utils/date-utils'
import { listAppointmentsSchema } from './schema'

interface Data {
  calendarClassId: string
  date: string
}

export class CalendarClassListAppointmentsUseCase {
  constructor(private schema = listAppointmentsSchema) {}

  async handle(data: Data) {
    await this.validate(data)
    return this.query(data)
  }

  private async validate(data: Data) {
    await this.schema.validateAsync(data)
  }

  private async query(data: Data) {
    const date = getDate(data.date)
    const list = await CalendarAppointment.findAll({
      where: {
        [Op.and]: [
          { calendarClassId: data.calendarClassId },
          literal(`date_trunc('day', "CalendarAppointment"."date_start") = '${date}'`)
        ]
      },
      include: [
        { association: 'customer', attributes: ['id', 'name'] },
        { association: 'calendarLabel', attributes: ['id', 'name', 'color'] }
      ],
      attributes: ['id', 'notes']
    })

    return list.map(item => item.toJSON()).map(item => this.map(item))
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
