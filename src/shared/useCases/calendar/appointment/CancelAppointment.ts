import CalendarAppointment from '../../../database/models/CalendarAppointment'

export class CalendarCancelAppointmentUseCase {
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
