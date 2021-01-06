import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from 'date-fns';
import { Op } from 'sequelize';

import CustomError from '../../custom-error/CustomError';
import Activity from '../../database/models/Activity';
import ActivitySchedule from '../../database/models/ActivitySchedule';
import OrderActivity from '../../database/models/OrderActivity';
import Schedule from '../../database/models/Schedule';
import { PackageTypeEnum } from '../../models/enums/PackageTypeEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
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
        activityScheduleId: event.id,
        date: this.formatedDate,
        start: event.start,
        status: { [Op.not]: ScheduleStatusEnum.Canceled }
      }
    });

    if (maxSchedules <= countSchedules)
      throw new CustomError('Time is not available', 400);
  }

  async checkOrderAvailable(orderActivityId: number): Promise<void> {
    const orderActivity = await this.loadOrderActivityWithIncludes(
      orderActivityId
    );

    if (orderActivity.orderPackage) await this.checkOrderPackage(orderActivity);
  }

  async checkOrderPackage(orderActivity: OrderActivity): Promise<void> {
    const { order, orderPackage } = orderActivity;

    if (orderPackage.expiration && orderPackage.expiration < this.date)
      throw new CustomError('Package expired');

    if (orderPackage.type === PackageTypeEnum.unlimited) return;

    const [startDate, endDate] = this.getDateRange(
      this.date,
      orderPackage.recurrencyPay
    );
    const countSchedules = await this.countSchedule(
      startDate,
      endDate,
      orderActivity.id
    );

    if (orderPackage.type === PackageTypeEnum.appointments) {
      const total = order.quantity * orderActivity.packageQuantity;
      if (countSchedules + 1 > total)
        throw new CustomError('Limit of appointments was exceeded');
    }

    if (orderPackage.type === PackageTypeEnum.amount) {
      const total = order.quantity * Number(orderPackage.total);
      const priceTotal = await this.sumScheduledPriceByOrderPackageId(
        startDate,
        endDate,
        orderPackage.id
      );

      if (priceTotal + Number(orderActivity.price) > total)
        throw new CustomError('Total amount was exceeded');
    }

    //verificar recorrencia e tipo de pacote
    // unlimited, appointments....
    // expiration date
  }

  async countSchedule(start: Date, end: Date, orderActivityId?: number) {
    const ands: any[] = [
      { date: { [Op.gte]: format(start, 'yyyy-MM-dd') } },
      { date: { [Op.lte]: format(end, 'yyyy-MM-dd') } },
      { status: { [Op.ne]: ScheduleStatusEnum.Canceled } },
      { orderActivityId }
    ];

    return Schedule.count({
      col: 'id',
      where: { [Op.and]: ands }
    });
  }

  async sumScheduledPriceByOrderPackageId(
    start: Date,
    end: Date,
    orderPackageId: number
  ) {
    const prices = await Schedule.findAll({
      attributes: [],
      where: {
        [Op.and]: [
          { date: { [Op.gte]: format(start, 'yyyy-MM-dd') } },
          { date: { [Op.lte]: format(end, 'yyyy-MM-dd') } },
          { status: { [Op.ne]: ScheduleStatusEnum.Canceled } },
          { '$orderActivity.order_package_id$': orderPackageId }
        ]
      },
      include: [{ association: 'orderActivity', attributes: ['price'] }]
    });

    return prices
      .map(x => Number(x.orderActivity.price))
      .reduce((acc, current) => acc + current, 0);
  }

  async loadOrderActivityWithIncludes(
    orderActivityId: number
  ): Promise<OrderActivity> {
    return OrderActivity.findByPk(orderActivityId, {
      include: ['order', 'orderPackage']
    });
  }

  getDateRange(date: Date, recurrency: RecurrencyPayEnum): [Date, Date] {
    if (recurrency === RecurrencyPayEnum.weekly) {
      return [startOfWeek(date), endOfWeek(date)];
    }

    if (recurrency === RecurrencyPayEnum.monthly) {
      return [startOfMonth(date), endOfMonth(date)];
    }

    return [date, date];
  }
}
