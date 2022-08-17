import { CustomError, NotFoundError } from '../../../custom-error'
import CalendarClass from '../../../database/models/CalendarClass'
import { destroySchema } from './schema'
import { isSameDay, parseISO } from '../../../utils/date-utils'
import RRule from 'rrule'
import { Op } from 'sequelize'

interface Data {
  id: string
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
    if (data.following) await this.destroyCurrentAndFollowing()
    else await this.destroyCurrent()
  }

  private async destroyCurrentAndFollowing() {
    await CalendarClass.destroy({
      where: {
        recurrenceId: this.model.recurrenceId,
        dateStart: { [Op.gte]: this.model.dateStart }
      }
    })
  }

  private async destroyCurrent() {
    await this.model.destroy()
  }
}
