import { rrulestr } from 'rrule'

import { NotFoundError } from '../../../custom-error'
import CalendarSlot from '../../../database/models/CalendarSlot'
import { destroyBlockSchema } from './schema'
import { isSameDay, parseISO, startOfDay } from '../../../utils/date-utils'

interface Data {
  id: string
  date: string
  following: boolean
}

export class CalendarDestroyBlockUseCase {
  private model: CalendarSlot
  private schema = destroyBlockSchema

  async handle(data: Data) {
    await this.validate(data)
    await this.loadModel(data)
    await this.execute(data)
  }

  private async validate(data: Data) {
    await this.schema.validateAsync(data)
  }

  private async loadModel(data: Data) {
    this.model = await CalendarSlot.findByPk(data.id)
    if (!this.model) throw new NotFoundError('Calendar Block not found')
  }

  private async execute(data: Data): Promise<void> {
    if (!this.isRecurrent()) await this.destroy()
    else if (data.following) await this.destroyCurrentAndFollowing(data)
    else await this.destroyCurrent(data)
  }

  private isRecurrent() {
    return Boolean(this.model.recurrenceRule)
  }

  private async destroy() {
    await this.model.destroy()
  }

  private async destroyCurrent({ date }: Data) {
    const exceptions = JSON.parse(this.model.recurrenceExceptions || '[]') as string[]
    const dateExist = exceptions.some(excption =>
      isSameDay(parseISO(excption), parseISO(date))
    )
    if (!dateExist) {
      this.model.recurrenceExceptions = JSON.stringify([...exceptions, date])
      await this.model.save()
    }
  }

  private async destroyCurrentAndFollowing({ date }: Data) {
    const rule = rrulestr(this.model.recurrenceRule)
    rule.origOptions.until = startOfDay(parseISO(date))

    this.model.recurrenceRule = rule.toString()

    await this.model.save()
  }
}
