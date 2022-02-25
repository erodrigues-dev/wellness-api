import { CalendarListAppointmentsUseCase } from '../appointment/ListAppointments'
import { CalendarClassListUseCase } from '../class/CalendarClassListUseCase'

interface Data {
  calendars: string[]
  date: string
}

export class SchedulerListItemsUseCase {
  constructor(
    private listAppointments = new CalendarListAppointmentsUseCase(),
    private listClasses = new CalendarClassListUseCase()
  ) {}

  async list(data: Data) {
    const [appointments, classes] = await Promise.all([
      this.listAppointments.handle(data),
      this.listClasses.handle(data)
    ])

    return {
      appointments,
      classes
    }
  }
}
