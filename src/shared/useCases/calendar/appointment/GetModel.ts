import CalendarAppointment from '../../../database/models/CalendarAppointment'

export class GetModel {
  handle(id) {
    return CalendarAppointment.findByPk(id, {
      include: this.getIncludes()
    })
  }

  getIncludes() {
    return [
      { association: 'activity', attributes: ['id', 'name', 'duration'] },
      { association: 'customer', attributes: ['id', 'name'] },
      { association: 'calendar', attributes: ['id', 'name'] },
      { association: 'calendarLabel', attributes: ['id', 'name', 'color'] }
    ]
  }

  map(item: CalendarAppointment) {
    return {
      id: item.id,
      dateStart: item.dateStart,
      dateEnd: item.dateEnd,
      customerId: item.customerId,
      activityId: item.activityId,
      calendarId: item.calendarId,
      calendarLabelId: item.calendarLabelId,
      calendarClassId: item.calendarClassId,
      customer: item.customer,
      activity: item.activity,
      calendar: item.calendar,
      calendarLabel: item.calendarLabel,
      notes: item.notes
    }
  }
}
