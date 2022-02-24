import CalendarSlot from '../../../database/models/CalendarSlot'
import { GetModel } from './GetModel'
import { createBlockSchema } from './schema'

interface BlockData {
  calendarId: string
  start: string
  end: string
  recurrenceRule: string
  recurrenceExceptions: string
}

export class CalendarCreateBlockUseCase {
  private getModel = new GetModel()

  async handle(data: BlockData) {
    await this.validate(data)
    const { id } = await this.save(data)
    return this.getModel.handle(id)
  }

  async validate(data: BlockData) {
    await createBlockSchema.validateAsync(data)
  }

  private async save(data: BlockData) {
    const saveData = {
      ...data,
      status: 'block',
      recurrenceExceptions: JSON.stringify(data.recurrenceExceptions || [])
    }
    const model = await CalendarSlot.create(saveData)
    return model
  }
}
