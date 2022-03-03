import CalendarLabel from '../database/models/CalendarLabel';

export class CalendarLabelService {
  list() {
    return CalendarLabel.findAll();
  }

  store(data: any) {
    return CalendarLabel.create(data);
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
