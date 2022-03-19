import CalendarAppointment from '../../../database/models/CalendarAppointment'

import { updateAppointmentSchema } from './schema'
import CalendarClass from '../../../database/models/CalendarClass'
import { CalculateDateEnd } from '../shared/CalculateDateEnd'
import { GetModel } from './GetModel'

interface UpdateAppointmentData {
  id: string
  calendarClassId: string
  calendarId: string
  activityId: number
  dateStart: string
  customerId: number
  calendarLabelId: string
  notes: string
}

export class CalendarUpdateAppointmentUseCase {
  private calculateDateEnd: CalculateDateEnd
  private getModel: GetModel

  constructor() {
    this.calculateDateEnd = new CalculateDateEnd()
    this.getModel = new GetModel()
  }

  async handle(data: UpdateAppointmentData) {
    await updateAppointmentSchema.validateAsync(data)
    await this.save(data)
    return this.getModel.handle(data.id)
  }

  private save(data: UpdateAppointmentData) {
    const isClassAppointment = Boolean(data.calendarClassId)
    if (isClassAppointment) return this.saveWithClassAppointment(data)
    return this.saveWithAppointment(data)
  }

  private async saveWithClassAppointment({ id, ...data }: UpdateAppointmentData) {
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

    await CalendarAppointment.update(appointmentData, { where: { id } })
  }

  private async saveWithAppointment({ id, ...data }: UpdateAppointmentData) {
    const dateEnd = await this.calculateDateEnd.calculate(data)

    await CalendarAppointment.update({ ...data, dateEnd }, { where: { id } })
  }
}
