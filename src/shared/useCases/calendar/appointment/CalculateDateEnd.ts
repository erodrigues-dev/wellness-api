import Activity from '../../../database/models/Activity'
import { addMinutes } from '../../../utils/date-utils'

interface Data {
  dateStart: string | Date
  activityId: number
}

export class CalculateDateEnd {
  async calculate({ dateStart, activityId }: Data) {
    const { duration } = await Activity.findByPk(activityId)
    return addMinutes(new Date(dateStart), duration)
  }
}
