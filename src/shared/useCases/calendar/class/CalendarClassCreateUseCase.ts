import RRule from 'rrule'
import { v4 as uuid } from 'uuid'

import CalendarClass from '../../../database/models/CalendarClass'
import { storeSchema } from './schema'
import { GetModel } from './GetModel'
import { CalculateDateEnd } from '../shared/CalculateDateEnd'
import { addMinutes, parseISO, startOfDay } from '../../../utils/date-utils'

interface Data {
  calendarId: string
  activityId: number
  dateStart: string
  slots: number
  recurrenceRule: string
  color: string
  notes: string
}

export class CalendarClassCreateUseCase {
  private getModel: GetModel
  private calculateDateEnd: CalculateDateEnd

  constructor() {
    this.getModel = new GetModel()
    this.calculateDateEnd = new CalculateDateEnd()
  }

  async handle(data: Data) {
    await this.validate(data)
    const { id } = await this.save(data)
    return this.getModel.handle(id)
  }

  async validate(data: Data) {
    await storeSchema.validateAsync(data)
  }

  async save(data: Data) {
    if (data.recurrenceRule) return await this.saveRecurrence(data)
    return await this.saveUnique(data)
  }

  async saveUnique(data: Data) {
    const dateEnd = await this.calculateDateEnd.calculate(data)
    const model = await CalendarClass.create({ ...data, dateEnd })
    return model
  }

  async saveRecurrence(data: Data) {
    const originalDateStart = parseISO(data.dateStart)

    const rule = RRule.fromString(data.recurrenceRule)
    rule.options.dtstart = startOfDay(originalDateStart)
    rule.options.byhour = [originalDateStart.getUTCHours()]
    rule.options.byminute = [originalDateStart.getMinutes()]
    rule.options.bysecond = [0]

    const maxLength180 = (_date: Date, length: number) => length <= 180

    const allDates = rule.all(maxLength180)

    const recurrenceId = uuid()
    const activityDuration = await this.calculateDateEnd.getDuration(data.activityId)

    const models = await Promise.all(
      allDates.map(dateStart => {
        const dateEnd = addMinutes(dateStart, activityDuration)

        return CalendarClass.create({
          ...data,
          dateStart,
          dateEnd,
          recurrenceId
        })
      })
    )

    return models[0]
  }
}
