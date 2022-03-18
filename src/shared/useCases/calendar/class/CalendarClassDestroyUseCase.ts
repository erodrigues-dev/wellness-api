import { CustomError, NotFoundError } from '../../../custom-error'
import CalendarClass from '../../../database/models/CalendarClass'
import { destroySchema } from './schema'
import { isSameDay, parseISO } from '../../../utils/date-utils'
import RRule from 'rrule'

interface Data {
  id: string
  date: string
  following: boolean
}

export class CalendarClassDestroyUseCase {
  private model: CalendarClass
  private schema = destroySchema

  async handle(data: Data) {
    await this.validate(data)
    await this.loadModel(data)
    await this.execute(data)
  }

  private async validate(data: Data) {
    await this.schema.validateAsync(data)
  }

  private async loadModel(data: Data) {
    this.model = await CalendarClass.findByPk(data.id)
    if (!this.model) throw new NotFoundError('Calendar class not found')
  }

  private async execute(data: Data): Promise<void> {
    if (data.following) await this.destroyFollowing(data)
    else if (data.date) await this.destroyCurrent(data)
    else await this.destroy()
  }

  private async destroyFollowing({ date }: Data) {
    if (!date) throw new CustomError('Date is required')

    const rule = RRule.fromString(this.model.recurrenceRule)
    rule.origOptions.until = parseISO(date)
    this.model.recurrenceRule = rule.toString()
    await this.model.save()
  }

  private async destroyCurrent({ date }: Data) {
    if (!date) throw new CustomError('Date is required')

    const exceptions = JSON.parse(this.model.recurrenceExceptions || '[]') as string[]
    const dateExist = exceptions.some(excption =>
      isSameDay(parseISO(excption), parseISO(date))
    )
    if (!dateExist) {
      this.model.recurrenceExceptions = JSON.stringify([...exceptions, date])
      await this.model.save()
    }
  }

  private async destroy() {
    const isRecurrent = Boolean(this.model.recurrenceRule)
    if (isRecurrent) throw new CustomError('Unable to destroy a recurrent class')

    await this.model.destroy()
  }
}
