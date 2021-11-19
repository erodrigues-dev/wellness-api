import CustomError from '../custom-error/CustomError';
import CalendarAvailability from '../database/models/CalendarAvailability';

export class CalendarAvailabilityService {
  listByCalendar(calendarId) {
    return CalendarAvailability.findAll({
      where: {
        calendarId
      }
    });
  }

  async get(id) {
    return CalendarAvailability.findByPk(id);
  }

  async create(data) {
    const model = await CalendarAvailability.create(data);
    return model.id;
  }

  async update({ id, ...data }) {
    await CalendarAvailability.update(data, { where: { id } });
  }

  async destroy(id) {
    const rows = await CalendarAvailability.destroy({ where: { id } });
    if (rows === 0) throw new CustomError('Calendar availability not found', 404);
  }
}
