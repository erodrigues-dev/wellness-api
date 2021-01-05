import { format } from 'date-fns';

import CustomError from '../../custom-error/CustomError';
import Activity from '../../database/models/Activity';
import ActivitySchedule from '../../database/models/ActivitySchedule';
import OrderActivity from '../../database/models/OrderActivity';
import Schedule from '../../database/models/Schedule';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

export class ScheduleCreateUseCase {
  constructor(
    private customerId: number,
    private orderActivityId: number,
    private eventId: number,
    private date: Date
  ) {}

  get formatedDate() {
    return format(this.date, 'yyyy-MM-dd');
  }

  async create() {
    const event = await this.getEvent(this.eventId);

    await this.checkAvailableTime(event);
    await this.checkOrderAvailable(this.orderActivityId);

    await Schedule.create({
      customerId: this.customerId,
      orderActivityId: this.orderActivityId,
      activityScheduleId: this.eventId,
      title: event.title,
      start: event.start,
      end: event.end,
      date: this.formatedDate,
      status: ScheduleStatusEnum.Scheduled
    });
  }

  async getEvent(eventId: number): Promise<ActivitySchedule> {
    const event = await ActivitySchedule.findByPk(eventId);

    if (!event) throw new CustomError('Invalid activity schedule', 400);

    return event.toJSON() as ActivitySchedule;
  }

  async checkAvailableTime(event: ActivitySchedule): Promise<void> {
    const activity = await Activity.findByPk(event.activityId);
    const maxSchedules = activity.maxPeople || 1;

    const countSchedules = await Schedule.count({
      where: {
        date: this.formatedDate,
        start: event.start
      }
    });

    if (maxSchedules <= countSchedules)
      throw new CustomError('Time is not available', 400);
  }

  async checkOrderAvailable(orderActivityId: number): Promise<void> {
    const {
      order,
      orderPackage,
      ...orderActivity
    } = await OrderActivity.findByPk(orderActivityId, {
      include: ['order', 'orderPackage']
    });
  }
}
