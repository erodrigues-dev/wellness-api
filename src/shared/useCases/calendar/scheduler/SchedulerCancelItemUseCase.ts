import CalendarAppointment from '../../../database/models/CalendarAppointment'

export class SchedulerCancelItemUseCase {
  async handle(id: string) {
    await CalendarAppointment.update(
      {
        canceledAt: new Date()
      },
      {
        where: { id }
      }
    )
  }
}
