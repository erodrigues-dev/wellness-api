import CalendarLabel from '../database/models/CalendarLabel';

export class CalendarLabelService {
  list() {
    return CalendarLabel.findAll();
  }

  async store(data: any) {
    const model = await CalendarLabel.create(data)
    return {
      id: model.id,
      name: model.name,
      color: model.color
    }
  }

  async update({ id, ...data }: any) {
    const [count] = await CalendarLabel.update(data, { where: { id } })
    if (count === 0) throw new NotFoundError('Label not found')
    return { id, ...data }
  }

  async destroy(id: string) {
    const count = await CalendarLabel.destroy({ where: { id } })
    if (count === 0) throw new NotFoundError('Label not found')
  }
}
