import CalendarEntry from '../../../database/models/CalendarEntry';

export class CalendarEntryListUseCase {
  async handle({ calendarId }) {
    const list = await CalendarEntry.findAll({
      where: { calendarId },
      attributes: {
        exclude: ['activityId', 'customerId']
      },
      include: [
        {
          association: 'activity',
          attributes: ['id', 'name']
        },
        {
          association: 'customer',
          attributes: ['id', 'name']
        }
      ]
    });

    return list;
  }
}
