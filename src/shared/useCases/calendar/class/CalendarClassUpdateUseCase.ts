import CalendarClass from '../../../database/models/CalendarClass'

import { updateSchema } from './schema'

export class CalendarClassUpdateUseCase {
  async handle(data: any) {
    await this.validate(data)
    return CalendarClass.create(data)
  }

  validate(data: any) {
    return updateSchema.validateAsync(data)
  }
}
