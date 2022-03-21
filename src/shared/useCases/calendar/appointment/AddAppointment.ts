import CalendarAppointment from '../../../database/models/CalendarAppointment'

import { createAppointmentSchema } from './schema'
import CalendarClass from '../../../database/models/CalendarClass'
import { CalculateDateEnd } from '../shared/CalculateDateEnd'
import { GetModel } from './GetModel'

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
  private calculateDateEnd: CalculateDateEnd
  private getModel: GetModel

  constructor() {
    this.calculateDateEnd = new CalculateDateEnd()
    this.getModel = new GetModel()
  }

  async handle(data: AddAppointmentData) {
    await createAppointmentSchema.validateAsync(data)
    const id = await this.save(data)
    return this.getModel.handle(id)
  }

  private save(data: AddAppointmentData) {
    const isClassAppointment = Boolean(data.calendarClassId)
    if (isClassAppointment) return this.saveWithClassAppointment(data)
    return this.saveWithAppointment(data)
  }

  private async saveWithClassAppointment(data: AddAppointmentData) {
    const calendarClass = await CalendarClass.findByPk(data.calendarClassId)

    const dateEnd = await this.calculateDateEnd.calculate({
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
    const dateEnd = await this.calculateDateEnd.calculate(data)

    const { id } = await CalendarAppointment.create({ ...data, dateEnd })
    return id
  }
}
