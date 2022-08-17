import { GetModel } from './GetModel'

export class CalendarClassGetByIdUseCase {
  constructor(private getModel = new GetModel()) {}

  async handle(id: string) {
    return this.getModel.handle(id)
  }
}
