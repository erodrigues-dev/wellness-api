import CalendarAppointment from '../../../database/models/CalendarAppointment'
import Activity from '../../../database/models/Activity'

import { addMinutes } from '../../../utils/date-utils'

import { createAppointmentSchema } from './schema'
import CalendarClass from '../../../database/models/CalendarClass'

interface AddAppointmentData {
  calendarClassId: string
  calendarId: string
  activityId: number
  dateStart: string
  customerId: number
  calendarLabelId: string
  notes: string
}

export class CalendarAddAppointmentUseCase {
  async handle(data: AddAppointmentData) {
    await createAppointmentSchema.validateAsync(data)
    const id = await this.save(data)
    return this.getModel(id)
  }

  private save(data: AddAppointmentData) {
    const isClassAppointment = Boolean(data.calendarClassId)
    if (isClassAppointment) return this.saveWithClassAppointment(data)
    return this.saveWithAppointment(data)
  }

  private async saveWithClassAppointment(data: AddAppointmentData) {
    const calendarClass = await CalendarClass.findByPk(data.calendarClassId)

    const dateEnd = await this.calculateDateEnd({
      dateStart: data.dateStart,
      activityId: calendarClass.activityId
    })

    const appointmentData = {
      calendarClassId: calendarClass.id,
      calendarId: calendarClass.calendarId,
      activityId: calendarClass.activityId,
      customerId: data.customerId,
      calendarLabelId: data.calendarLabelId,
      notes: data.notes,
      dateStart: data.dateStart,
      dateEnd
    }

    const { id } = await CalendarAppointment.create(appointmentData)
    return id
  }

  private async saveWithAppointment(data: AddAppointmentData) {
    const dateEnd = await this.calculateDateEnd(data)

    const { id } = await CalendarAppointment.create({ ...data, dateEnd })
    return id
  }

  private async calculateDateEnd({ dateStart, activityId }) {
    const { duration } = await Activity.findByPk(activityId)
    return addMinutes(new Date(dateStart), duration)
  }

  private getModel(id) {
    return CalendarAppointment.findByPk(id, {
      include: [
        { association: 'calendar', attributes: ['id', 'name'] },
        { association: 'activity', attributes: ['id', 'name', 'duration'] },
        { association: 'customer', attributes: ['id', 'name'] },
        { association: 'calendarLabel', attributes: ['id', 'name', 'color'] }
      ]
    })
  }
}
