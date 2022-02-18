import { NotFoundError } from '../../../custom-error'
import CalendarClass from '../../../database/models/CalendarClass'

export class CalendarClassDestroyUseCase {
  async handle(id: string) {
    const model = await CalendarClass.findByPk(id)
    if (!model) throw new NotFoundError('Calendar class not found')
    await model.destroy()
  }
}
