import { GetModel } from './GetModel'

export class CalendarClassGetByIdUseCase {
  constructor(private getModel = new GetModel()) {}

  async handle(id: string) {
    const model = await this.getModel.handle(id)
    return this.getModel.map(model)
  }
}
