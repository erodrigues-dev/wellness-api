import CalendarAppointment from '../../../database/models/CalendarAppointment'

export class GetModel {
  handle(id) {
    return CalendarAppointment.findByPk(id, {
      include: this.getIncludes()
    })
  }

  getIncludes() {
    return [
      { association: 'calendar', attributes: ['id', 'name'] },
      { association: 'activity', attributes: ['id', 'name', 'duration'] },
      { association: 'customer', attributes: ['id', 'name'] },
      { association: 'calendarLabel', attributes: ['id', 'name', 'color'] }
    ]
  }
}
