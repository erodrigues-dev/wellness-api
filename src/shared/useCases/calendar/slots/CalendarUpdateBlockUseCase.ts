import { ObjectSchema } from 'joi'
import CalendarSlot from '../../../database/models/CalendarSlot'
import { GetModel } from './GetModel'
import { updateBlockSchema } from './schema'

interface BlockData {
  id: string
  calendarId: string
  start: string
  end: string
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
      ...data,
      status: 'block',
      recurrenceExceptions: JSON.stringify(data.recurrenceExceptions || [])
    }
    await CalendarSlot.update(saveData, { where: { id } })
  }
}
