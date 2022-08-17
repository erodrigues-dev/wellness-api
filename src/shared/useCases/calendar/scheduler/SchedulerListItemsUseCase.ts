import { CalendarListAppointmentsUseCase } from '../appointment/ListAppointments'
import { CalendarClassListUseCase } from '../class/CalendarClassListUseCase'
import { SchedulerListSlotUseCase } from './SchedulerListSlotsUseCase'

interface Data {
  calendars: string[]
  date: string
}

export class SchedulerListItemsUseCase {
  constructor(
    private listAppointments = new CalendarListAppointmentsUseCase(),
    private listClasses = new CalendarClassListUseCase(),
    private listSlots = new SchedulerListSlotUseCase()
  ) {}

  async list(data: Data) {
    const [appointments, classes, slots] = await Promise.all([
      this.listAppointments.handle(data),
      this.listClasses.handle(data),
      this.listSlots.handle(data)
    ])

    return {
      appointments,
      classes,
      blocks: slots.filter(x => x.status === 'block'),
      slots: slots.filter(x => x.status === 'available')
    }
  }
}
