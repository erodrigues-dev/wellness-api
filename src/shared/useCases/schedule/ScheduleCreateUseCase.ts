import { format } from 'date-fns';

import CustomError from '../../custom-error/CustomError';
import ActivitySchedule from '../../database/models/ActivitySchedule';
import Schedule from '../../database/models/Schedule';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

export class ScheduleCreateUseCase {
  constructor(
    private customerId: number,
    private orderActivityId: number,
    private activityScheduleId: number,
    private date: Date
  ) {}

  async create() {
    const activitySchedule = await ActivitySchedule.findByPk(
      this.activityScheduleId
    );

    if (!activitySchedule)
      throw new CustomError('Invalid activity schedule', 400);

    await Schedule.create({
      customerId: this.customerId,
      orderActivityId: this.orderActivityId,
      activityScheduleId: this.activityScheduleId,
      title: activitySchedule.title,
      start: activitySchedule.start,
      end: activitySchedule.end,
      date: format(this.date, 'yyyy-MM-dd'),
      status: ScheduleStatusEnum.Scheduled
    });
  }
}
