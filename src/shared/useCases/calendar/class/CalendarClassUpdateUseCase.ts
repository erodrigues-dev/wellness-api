import { Op, Transaction } from 'sequelize'
import RRule from 'rrule'
import { v4 as uuid } from 'uuid'

import CalendarClass from '../../../database/models/CalendarClass'
import { addMinutes, parseISO, startOfDay } from '../../../utils/date-utils'
import { updateSchema } from './schema'
import { GetModel } from './GetModel'
import { CalculateDateEnd } from '../shared/CalculateDateEnd'
import { NotFoundError } from '../../../custom-error'

interface UpdateData {
  id: string
  calendarId: string
  activityId: number
  dateStart: string
  slots: number
  recurrenceRule: string
  color: string
  notes: string
}

interface Data extends UpdateData {
  following: boolean
}

type CreateRecurrenceItemsData = {
  data: UpdateData
  allDates: Date[]
  activityDuration: number
  recurrenceId: string
  transaction: Transaction
}

export class CalendarClassUpdateUseCase {
  private calculateDateEnd = new CalculateDateEnd()
  private getModel = new GetModel()
  private model: CalendarClass
  private schema = updateSchema

  async handle(data: Data) {
    await this.validate(data)
    await this.loadModel(data.id)
    await this.save(data)
    return this.getModel.handle(data.id)
  }

  validate(data: Data) {
    return this.schema.validateAsync(data)
  }

  private async loadModel(id: string) {
    this.model = await CalendarClass.findByPk(id)
    if (!this.model) throw new NotFoundError()
  }

  private save({ following, ...data }: Data) {
    if (following) return this.saveCurrentAndFollowing(data)

    return this.saveCurrent(data)
  }

  private async saveCurrent(data: UpdateData) {
    const newDateStart = parseISO(data.dateStart)
    if (this.model.dateStart !== newDateStart) {
      this.model.dateStart = newDateStart
      this.model.dateEnd = await this.calculateDateEnd.calculate(data)
    }

    this.model.calendarId = data.calendarId
    this.model.activityId = data.activityId
    this.model.slots = data.slots
    this.model.color = data.color
    this.model.notes = data.notes

    await this.model.save()
  }

  private async saveCurrentAndFollowing(data: UpdateData) {
    const transaction = await CalendarClass.sequelize.transaction()

    try {
      const referenceDate = this.model.dateStart
      const recurrenceId = this.model.recurrenceId
      await this.destroyFollowingEvents({ referenceDate, recurrenceId, transaction })
      await this.generateNewRecurrenceSeries(data, transaction)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  private async destroyFollowingEvents({ recurrenceId, referenceDate, transaction }) {
    await CalendarClass.destroy({
      where: {
        recurrenceId,
        dateStart: { [Op.gt]: referenceDate }
      },
      transaction
    })
  }

  private async generateNewRecurrenceSeries(data: UpdateData, transaction: Transaction) {
    const { dateStart, recurrenceRule } = data
    const allDates = this.getAllDatesOfRecurrence(dateStart, recurrenceRule)

    const fisrtDate = allDates.shift()

    const recurrenceId = uuid()
    const activityDuration = await this.calculateDateEnd.getDuration(data.activityId)

    await this.updateFirstItem(
      {
        ...data,
        dateStart: fisrtDate,
        dateEnd: addMinutes(fisrtDate, activityDuration),
        recurrenceId
      },
      transaction
    )

    await this.createRecurrenceItems({
      data,
      allDates,
      activityDuration,
      recurrenceId,
      transaction
    })
  }

  private async updateFirstItem(item: any, transaction: Transaction) {
    const { id, ...data } = item
    await CalendarClass.update(data, { where: { id }, transaction })
  }

  private async createRecurrenceItems({
    data,
    allDates,
    activityDuration,
    recurrenceId,
    transaction
  }: CreateRecurrenceItemsData) {
    const results = await Promise.all(
      allDates.map(dateStart => {
        const dateEnd = addMinutes(dateStart, activityDuration)

        return CalendarClass.create(
          {
            ...data,
            id: null,
            dateStart,
            dateEnd,
            recurrenceId
          },
          { transaction }
        )
      })
    )

    return results
  }

  private getAllDatesOfRecurrence(dateStart: string, recurrenceRule: string) {
    const originalDateStart = parseISO(dateStart)

    const rule = RRule.fromString(recurrenceRule)
    rule.options.dtstart = startOfDay(originalDateStart)
    rule.options.byhour = [originalDateStart.getUTCHours()]
    rule.options.byminute = [originalDateStart.getMinutes()]
    rule.options.bysecond = [0]

    const maxLength180 = (_date: Date, length: number) => length <= 180

    const allDates = rule.all(maxLength180)

    return allDates
  }
}
