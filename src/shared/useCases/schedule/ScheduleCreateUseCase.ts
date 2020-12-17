import { format } from 'date-fns';

import Schedule from '../../database/models/Schedule';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

export class ScheduleCreateUseCase {
  constructor(
    private customerId: number,
    private activityScheduleId: number,
    private date: Date
  ) {}

  async create() {
    await Schedule.create({
      customerId: this.customerId,
      activityScheduleId: this.activityScheduleId,
      status: ScheduleStatusEnum.Scheduled,
      date: format(this.date, 'yyyy-MM-dd')
    });
  }
}
