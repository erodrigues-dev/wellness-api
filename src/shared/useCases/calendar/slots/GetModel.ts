import { NotFoundError } from '../../../custom-error'
import CalendarSlot from '../../../database/models/CalendarSlot'

export class GetModel {
  async handle(id: string) {
    const model = await CalendarSlot.findByPk(id, {
      include: {
        association: 'calendar',
        attributes: ['id', 'name']
      }
    })

    if (!model) throw new NotFoundError()

    return this.map(model.toJSON())
  }

  private map(item) {
    return {
      ...item,
      recurrenceExceptions: JSON.parse(item.recurrenceExceptions || '[]')
    }
  }
}
