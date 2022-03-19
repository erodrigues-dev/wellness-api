import { literal, Op } from 'sequelize'
import { rrulestr } from 'rrule'

import CalendarClass from '../../../database/models/CalendarClass'
import CalendarAppointment from '../../../database/models/CalendarAppointment'
import { getDate, parseISO, startOfDay, isSameDay } from '../../../utils/date-utils'
import { listSchema } from './schema'
import { GetModel } from './GetModel'
import { RecurrenceUtil } from '../../../utils/RecurrenceUtil'

interface Props {
  date: string
  calendars: string[]
}

export class CalendarClassListUseCase {
  constructor(
    private getModel = new GetModel(),
    private recurrenceUtil = new RecurrenceUtil()
  ) {}

  async handle(data: Props) {
    await this.validate(data)
    const list = await this.query(data)

    return list.map(item => this.getModel.map(item))
  }

  private async validate(data: Props) {
    await listSchema.validateAsync(data)
  }

  private async query(data: Props) {
    const date = getDate(data.date)
    const list = await CalendarClass.findAll({
      where: {
        [Op.and]: [
          { calendarId: { [Op.in]: data.calendars } },
          literal(`date_trunc('day', "CalendarClass"."date_start") = '${date}'`)
        ]
      },
      include: this.getModel.getIncludesWithAppointments()
    })

    return list.map(item => item.toJSON())
  }
}
