import CalendarClass from '../../../database/models/CalendarClass'

export class GetModel {
  handle(id: string) {
    return CalendarClass.findByPk(id, {
      include: this.getIncludes()
    })
  }

  getIncludes() {
    return [
      { association: 'calendar', attributes: ['id', 'name'] },
      { association: 'activity', attributes: ['id', 'name', 'duration'] }
    ]
  }
}
