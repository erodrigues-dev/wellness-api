import { isPast, parseISO, isToday } from 'date-fns';

import CustomError from '../../custom-error/CustomError';
import Schedule from '../../database/models/Schedule';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

export class ScheduleChangeStatusUseCase {
  constructor(
    private scheduleId: number,
    private status: string,
    private userId: number
  ) {}

  async changeStatus() {
    const schedule = await Schedule.findByPk(this.scheduleId);

    this.checkIsPermited(schedule, this.status);

    if (this.status === ScheduleStatusEnum.Completed)
      schedule.attenderId = this.userId;
    schedule.status = this.status;

    await schedule.save();
  }

  private checkIsPermited(schedule: Schedule, route: string) {
    const { status } = schedule;

    if (!schedule) throw new CustomError('Schedule not found', 404);

    if (
      route !== ScheduleStatusEnum.Canceled &&
      route !== ScheduleStatusEnum.Arrived &&
      route !== ScheduleStatusEnum.Completed
    ) {
      throw new CustomError(
        `You cannot set ${route} as an appointment status.`,
        400
      );
    }

    if (
      route === ScheduleStatusEnum.Canceled ||
      route === ScheduleStatusEnum.Arrived
    )
      this.checkStatusArrivedCanceled(schedule, route);
    else if (
      route === ScheduleStatusEnum.Completed &&
      status !== ScheduleStatusEnum.Arrived
    )
      throw new CustomError(this.errorPermitedMessage(status, route), 400);
  }

  private errorPermitedMessage(status: string, route: string) {
    return `You cannot set ${route} for an appointment with a ${status} status`;
  }

  private checkStatusArrivedCanceled(schedule: Schedule, route: string) {
    if (schedule.status !== ScheduleStatusEnum.Scheduled)
      throw new CustomError(
        this.errorPermitedMessage(schedule.status, route),
        400
      );

    if (
      route === ScheduleStatusEnum.Canceled &&
      isPast(parseISO(`${schedule.date}T${schedule.start}`))
    )
      throw new CustomError('You cannot cancel a past appointment', 400);

    if (
      route === ScheduleStatusEnum.Arrived &&
      !isToday(parseISO(schedule.date))
    )
      throw new CustomError(
        'Arrived can just be set in appointments scheduled on the same day',
        400
      );
  }
}
