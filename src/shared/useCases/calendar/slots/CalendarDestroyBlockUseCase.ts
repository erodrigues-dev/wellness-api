import { NotFoundError } from '../../../custom-error'
import CalendarSlot from '../../../database/models/CalendarSlot'
import { destroySchema } from './schema'
import { isSameDay, parseISO } from '../../../utils/date-utils'

interface Data {
  id: string
  date: string
}

export class CalendarDestroyBlockUseCase {
  private model: CalendarSlot

  async handle(data: Data) {
    await this.validate(data)
    await this.loadModel(data)
    await this.execute(data)
  }

  private async validate(data: Data) {
    await destroySchema.validateAsync(data)
  }

  private async loadModel(data: Data) {
    this.model = await CalendarSlot.findByPk(data.id)
    if (!this.model) throw new NotFoundError('Calendar Block not found')
  }

  private async execute(data: Data): Promise<void> {
    if (data.date) await this.updateException(data)
    else await this.destroy()
  }

  private async destroy() {
    await this.model.destroy()
  }

  private async updateException({ date }: Data) {
    const exceptions = JSON.parse(this.model.recurrenceExceptions || '[]') as string[]
    const dateExist = exceptions.some(excption =>
      isSameDay(parseISO(excption), parseISO(date))
    )
    if (!dateExist) {
      this.model.recurrenceExceptions = JSON.stringify([...exceptions, date])
      await this.model.save()
    }
  }
}
