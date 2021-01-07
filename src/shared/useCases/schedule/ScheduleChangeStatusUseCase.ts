import { isPast, parseISO, isToday } from 'date-fns';

import CustomError from '../../custom-error/CustomError';
import Schedule from '../../database/models/Schedule';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

export class ScheduleChangeStatusUseCase {
  constructor(
    private scheduleId: number,
    private status: ScheduleStatusEnum,
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

    if (route === ScheduleStatusEnum.Scheduled)
      throw new CustomError('You cannot set scheduled for an appointment', 400);
    else if (
      route === ScheduleStatusEnum.Canceled ||
      route === ScheduleStatusEnum.Arrived
    )
      this.checkStatusArrivedAndCanceled(schedule, route);
    else if (route === ScheduleStatusEnum.Completed)
      this.checkCompletedIsPermited(status, route);
  }

  private errorPermitedMessage(status: string, route: string) {
    return `You cannot set ${route} for an appointment with a ${status} status`;
  }

  private checkCanceledIsPermited(schedule: Schedule, route: string) {
    if (
      route === ScheduleStatusEnum.Canceled &&
      isPast(parseISO(`${schedule.date}T${schedule.start}`))
    )
      throw new CustomError('You cannot cancel a past appointment', 400);
  }

  private checkArrivedIsPermited(date: string, route: string) {
    if (route === ScheduleStatusEnum.Arrived && !isToday(parseISO(date)))
      throw new CustomError(
        'Arrived can just be set in appointments scheduled on the same day',
        400
      );
  }

  private checkCompletedIsPermited(status: string, route: string) {
    if (status !== ScheduleStatusEnum.Arrived)
      throw new CustomError(this.errorPermitedMessage(status, route), 400);
  }

  private checkScheduleStatusIsScheduled(status: string, route: string) {
    if (status !== ScheduleStatusEnum.Scheduled)
      throw new CustomError(this.errorPermitedMessage(status, route), 400);
  }

  private checkStatusArrivedAndCanceled(schedule: Schedule, route: string) {
    this.checkScheduleStatusIsScheduled(schedule.status, route);
    this.checkCanceledIsPermited(schedule, route);
    this.checkArrivedIsPermited(schedule.date, route);
  }
}
