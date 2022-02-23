import { NotFoundError } from '../../../custom-error'
import CalendarAppointment from '../../../database/models/CalendarAppointment'

export class SchedulerGetItemUseCase {
  async handle(id) {
    const model = await CalendarAppointment.findByPk(id, {
      attributes: {
        exclude: ['activityId', 'customerId', 'labelId', 'calendarId']
      },
      include: [
        {
          association: 'activity',
          attributes: ['id', 'name', 'duration']
        },
        {
          association: 'customer',
          attributes: ['id', 'name']
        },
        {
          association: 'label',
          attributes: ['id', 'name', 'color']
        },
        {
          association: 'calendar',
          attributes: ['id', 'name']
        }
      ]
    })
    if (!model) throw new NotFoundError('Scheduler item not found')

    return model
  }
}
