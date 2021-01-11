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

  private checkIsPermited(schedule: Schedule, newStatus: string) {
    this.checkHasSchedule(schedule);
    this.checkNewStatusIsScheduled(newStatus);
    this.checkCanceledIsPermited(schedule, newStatus);
    this.checkArrivedIsPermited(schedule, newStatus);
    this.checkCompletedIsPermited(schedule.status, newStatus);
  }

  private errorPermitedMessage(scheduleStatus: string, newStatus: string) {
    return `You cannot set ${newStatus} for an appointment with a ${scheduleStatus} status`;
  }

  private checkHasSchedule(schedule: Schedule) {
    if (!schedule) throw new CustomError('Schedule not found', 404);
  }

  private checkNewStatusIsScheduled(newStatus: string) {
    if (newStatus === ScheduleStatusEnum.Scheduled)
      throw new CustomError('You cannot set scheduled for an appointment', 400);
  }

  private checkScheduleStatusIsScheduled(
    scheduleStatus: string,
    newStatus: string
  ) {
    if (scheduleStatus !== ScheduleStatusEnum.Scheduled)
      throw new CustomError(
        this.errorPermitedMessage(scheduleStatus, newStatus),
        400
      );
  }

  private checkCanceledIsPermited(schedule: Schedule, newStatus: string) {
    if (newStatus !== ScheduleStatusEnum.Canceled) return;

    this.checkScheduleStatusIsScheduled(schedule.status, newStatus);

    if (isPast(parseISO(`${schedule.date}T${schedule.start}`)))
      throw new CustomError('You cannot cancel a past appointment', 400);
  }

  private checkArrivedIsPermited(schedule: Schedule, newStatus: string) {
    if (newStatus !== ScheduleStatusEnum.Arrived) return;

    this.checkScheduleStatusIsScheduled(schedule.status, newStatus);

    if (!isToday(parseISO(schedule.date)))
      throw new CustomError(
        'Arrived can just be set in appointments scheduled on the same day',
        400
      );
  }

  private checkCompletedIsPermited(scheduleStatus: string, newStatus: string) {
    if (newStatus !== ScheduleStatusEnum.Completed) return;

    if (scheduleStatus !== ScheduleStatusEnum.Arrived)
      throw new CustomError(
        this.errorPermitedMessage(scheduleStatus, newStatus),
        400
      );
  }
}
