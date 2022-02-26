import { Op, literal } from 'sequelize'
import CalendarAppointment from '../../../database/models/CalendarAppointment'
import CalendarSlot from '../../../database/models/CalendarSlot'
import { GetModel } from './GetModel'
import { listAppointmentsSchema } from './schema'

interface Data {
  calendars: string[]
  date: string
}

export class CalendarListAppointmentsUseCase {
  constructor(
    private schema = listAppointmentsSchema,
    private getModel = new GetModel()
  ) {}

  async handle(data: Data) {
    await this.validate(data)
    const list = await this.query(data)
    return list
  }

  private async query({ calendars, date }: Data) {
    const [dateOnly] = date.split('T')

    const list = await CalendarAppointment.findAll({
      attributes: {
        exclude: ['activityId', 'customerId', 'labelId', 'createdAt', 'updatedAt']
      },
      include: this.getModel.getIncludes(),
      where: {
        [Op.and]: [
          { calendarId: { [Op.in]: calendars } },
          literal(`date_trunc('day', "date_start") = '${dateOnly}'`),
          { canceledAt: { [Op.is]: null } },
          { calendarClassId: { [Op.is]: null } }
        ]
      }
    })

    return list.map(this.getModel.map)
  }

  private validate(data) {
    return this.schema.validateAsync(data)
  }
}
