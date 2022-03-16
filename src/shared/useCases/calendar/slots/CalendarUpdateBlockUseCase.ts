import { ObjectSchema } from 'joi'
import CalendarSlot from '../../../database/models/CalendarSlot'
import { GetModel } from './GetModel'
import { updateBlockSchema } from './schema'

interface BlockData {
  id: string
  calendarId: string
  dateStart: string
  dateEnd: string
  recurrenceRule: string
  recurrenceExceptions: string
}

export class CalendarUpdateBlockUseCase {
  private getModel: GetModel
  private schema: ObjectSchema

  constructor() {
    this.getModel = new GetModel()
    this.schema = updateBlockSchema
  }

  async handle(data: BlockData) {
    await this.validate(data)
    await this.save(data)
    return this.getModel.handle(data.id)
  }

  async validate(data: BlockData) {
    await this.schema.validateAsync(data)
  }

  private async save({ id, ...data }: BlockData) {
    const saveData = {
      status: 'block',
      calendarId: data.calendarId,
      start: data.dateStart,
      end: data.dateEnd,
      recurrenceRule: data.recurrenceRule
    }
    await CalendarSlot.update(saveData, { where: { id } })
  }
}
