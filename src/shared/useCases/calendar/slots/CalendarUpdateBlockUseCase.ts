import { ObjectSchema } from 'joi'
import { rrulestr } from 'rrule'

import { isSameDay, parseISO, startOfDay } from '../../../utils/date-utils'
import { CustomError, NotFoundError } from '../../../custom-error'
import CalendarSlot from '../../../database/models/CalendarSlot'
import { GetModel } from './GetModel'
import { updateBlockSchema } from './schema'

interface UpdateOptions {
  updateOnDate: string
  updateFollowing: boolean
}

interface UpdateData {
  id: string
  calendarId: string
  dateStart: string
  dateEnd: string
  recurrenceRule: string
}

interface HandleData {
  data: UpdateData
  updateOptions: UpdateOptions
}

export class CalendarUpdateBlockUseCase {
  private getModel: GetModel
  private schema: ObjectSchema
  private model: CalendarSlot

  constructor() {
    this.getModel = new GetModel()
    this.schema = updateBlockSchema
  }

  async handle(handleData: HandleData) {
    await this.validate(handleData)
    await this.loadModel(handleData.data)
    const impactedItems = await this.save(handleData)
    return impactedItems.map(item => this.getModel.map(item))
  }

  async validate(data: HandleData) {
    await this.schema.validateAsync(data)
  }

  async loadModel(data: UpdateData) {
    this.model = await CalendarSlot.findByPk(data.id)
    if (!this.model) throw new NotFoundError()
  }

  private save({ updateOptions, data }: HandleData) {
    if (!this.isRecurrent()) {
      return this.updateNonRecurrent(data)
    }

    if (!updateOptions) throw new CustomError('Update options is required')
    if (!updateOptions.updateOnDate) throw new CustomError('updateOnDate is required')

    if (updateOptions.updateFollowing)
      return this.updateFollowingItemsInRecurrence(data, updateOptions.updateOnDate)

    return this.updateItemInRecurrence(data, updateOptions.updateOnDate)
  }

  private async updateNonRecurrent(data: UpdateData) {
    this.model.calendarId = data.calendarId
    this.model.start = parseISO(data.dateStart)
    this.model.end = parseISO(data.dateEnd)

    await this.model.save()
    return [this.model]
  }

  private async updateItemInRecurrence(data: UpdateData, updateOnDate: string) {
    const transaction = await CalendarSlot.sequelize.transaction()
    try {
      const exceptions = JSON.parse(this.model.recurrenceExceptions || '[]') as string[]
      const dateExist = exceptions.some(exceptionDate =>
        isSameDay(parseISO(exceptionDate), parseISO(updateOnDate))
      )

      if (!dateExist) {
        this.model.recurrenceExceptions = JSON.stringify([...exceptions, updateOnDate])
        await this.model.save({ transaction })
      }

      const created = await CalendarSlot.create(
        {
          status: 'block',
          calendarId: data.calendarId,
          start: parseISO(data.dateStart),
          end: parseISO(data.dateEnd)
        },
        { transaction }
      )

      await transaction.commit()
      return [this.model, created]
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  private async updateFollowingItemsInRecurrence(data: UpdateData, updateOnDate: string) {
    const transaction = await CalendarSlot.sequelize.transaction()

    try {
      const rule = rrulestr(this.model.recurrenceRule)
      rule.origOptions.until = startOfDay(parseISO(updateOnDate))
      this.model.recurrenceRule = rule.toString()
      await this.model.save({ transaction })

      const created = await CalendarSlot.create(
        {
          status: 'block',
          calendarId: data.calendarId,
          start: this.combineDates(data.dateStart, updateOnDate),
          end: this.combineDates(data.dateEnd, updateOnDate),
          recurrenceRule: data.recurrenceRule
        },
        { transaction }
      )
      await transaction.commit()

      return [this.model, created]
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  private combineDates(date: string, referenceDate: string) {
    const parsedDate = parseISO(date)
    const parsedReferenceDate = parseISO(referenceDate)

    if (isSameDay(parsedDate, parsedReferenceDate)) {
      return parsedDate
    }

    if (parsedDate < parsedReferenceDate) {
      const newDate = startOfDay(parsedReferenceDate)
      newDate.setHours(parsedDate.getHours())
      newDate.setMinutes(parsedDate.getMinutes())
      return newDate
    }

    return parsedDate
  }

  private isRecurrent() {
    return Boolean(this.model.recurrenceRule)
  }
}
