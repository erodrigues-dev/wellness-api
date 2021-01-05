import { isPast, parseISO } from 'date-fns';

import CustomError from '../../custom-error/CustomError';
import Schedule from '../../database/models/Schedule';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

export class ScheduleChangeStatuslUseCase {
  constructor(private scheduleId: number, private status: string) {}

  async changeStatus() {
    const schedule = await Schedule.findByPk(this.scheduleId);

    if (this.status === 'canceled') {
      this.checkCancelIsPermited(schedule);

      schedule.status = ScheduleStatusEnum.Canceled;
    } else if (this.status === 'arrived') {
      this.checkArrivedIsPermited(schedule);

      schedule.status = ScheduleStatusEnum.Arrived;
    } else if (this.status === 'completed') {
      this.checkCompletedIsPermited(schedule);

      schedule.status = ScheduleStatusEnum.Completed;
    } else {
      throw new CustomError(
        'You cannot set this parameter as an appointment status.',
        400
      );
    }

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

  private checkArrivedIsPermited(schedule: Schedule) {
    if (!schedule) throw new CustomError('Schedule not found', 404);

    if (schedule.status === ScheduleStatusEnum.Canceled) {
      throw new CustomError(
        'You cannot set Arrived for a canceled appointment.',
        400
      );
    }

    if (schedule.status === ScheduleStatusEnum.Completed) {
      throw new CustomError(
        'You cannot set Arrived for a completed appointment.',
        400
      );
    }
  }

  private checkCompletedIsPermited(schedule: Schedule) {
    if (!schedule) throw new CustomError('Schedule not found', 404);

    if (schedule.status === ScheduleStatusEnum.Canceled) {
      throw new CustomError(
        'You cannot set Completed for a canceled appointment.',
        400
      );
    }

    if (schedule.status === ScheduleStatusEnum.Scheduled) {
      throw new CustomError(
        'You cannot set completed to a scheduled appointment. Appointment must set as Arrived first',
        400
      );
    }

    if (schedule.status === ScheduleStatusEnum.Completed) {
      throw new CustomError('The Appointment is already complete.', 400);
    }
  }
}
