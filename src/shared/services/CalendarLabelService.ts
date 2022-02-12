import CalendarLabel from '../database/models/CalendarLabel';

export class CalendarLabelService {
  list() {
    return CalendarLabel.findAll();
  }

  store(data: any) {
    return CalendarLabel.create(data);
  }

  async update({ id, ...data }: any) {
    await CalendarLabel.update(data, { where: { id } });
  }

  async destroy(id) {
    await CalendarLabel.destroy({ where: { id } });
  }
}
