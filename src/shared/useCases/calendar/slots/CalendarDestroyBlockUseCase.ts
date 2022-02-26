import { NotFoundError } from '../../../custom-error'
import CalendarSlot from '../../../database/models/CalendarSlot'

export class CalendarDestroyBlockUseCase {
  async handle(id: string) {
    const model = await CalendarSlot.findByPk(id, { attributes: ['id'] })

    if (!model) throw new NotFoundError('Block not found')

    await model.destroy()
  }
}
