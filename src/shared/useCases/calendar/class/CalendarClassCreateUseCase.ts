import CalendarClass from '../../../database/models/CalendarClass'

import { storeSchema } from './schema'

export class CalendarClassCreateUseCase {
  async handle(data: any) {
    await this.validate(data)
    return CalendarClass.create(data)
  }

  validate(data: any) {
    return storeSchema.validateAsync(data)
  }
}
