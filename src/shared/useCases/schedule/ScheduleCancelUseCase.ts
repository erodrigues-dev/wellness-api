import { isPast, parseISO } from 'date-fns';

import CustomError from '../../custom-error/CustomError';
import Schedule from '../../database/models/Schedule';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

export class ScheduleCancelUseCase {
  constructor(private scheduleId: number) {}

  async cancel() {
    const schedule = await Schedule.findByPk(this.scheduleId);

    this.checkCancelIsPermited(schedule);

    schedule.status = ScheduleStatusEnum.Canceled;

    await schedule.save();
  }

  private checkCancelIsPermited(schedule: Schedule) {
    if (!schedule) throw new CustomError('Schedule not found', 404);

    if (schedule.status === ScheduleStatusEnum.Completed) {
      throw new CustomError(
        'You cannot cancel an appointment with a completed status',
        400
      );
    }

    const startDate = parseISO(`${schedule.date}T${schedule.start}`);
    if (isPast(startDate))
      throw new CustomError('You cannot cancel a past appointment', 400);
  }
}
