import { endOfMonth, endOfWeek, format, isPast, startOfMonth, startOfWeek } from 'date-fns';
import { Op } from 'sequelize';

import CustomError from '../../custom-error/CustomError';
import Activity from '../../database/models/Activity';
import Customer from '../../database/models/Customer';
import Event from '../../database/models/Event';
import Order from '../../database/models/Order';
import OrderActivity from '../../database/models/OrderActivity';
import Schedule from '../../database/models/Schedule';
import { PackageTypeEnum } from '../../models/enums/PackageTypeEnum';
import { PAID_STATUS } from '../../models/enums/PaymentStatusEnum';
import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';
import { sendEmailSchedule } from '../../sendingblue';
import { formatDateToDisplay, formatTime24To12 } from '../../utils/date-utils';
import { CheckWaiverSignatureUseCase } from '../customer/waiver/CheckWaiverSignatureUseCase';

export class ScheduleCreateUseCase {
  private checkwaiver: CheckWaiverSignatureUseCase;

  constructor(
    private customerId: number,
    private orderActivityId: number,
    private eventId: number,
    private date: Date
  ) {
    this.checkwaiver = new CheckWaiverSignatureUseCase();
  }

  get formatedDate() {
    return format(this.date, 'yyyy-MM-dd');
  }

  async create() {
    const event = await this.getEvent(this.eventId);
    await this.checkAvailableTime(event);
    await this.checkOrderAvailable(this.orderActivityId);
    await this.checkwaiver.check(this.customerId, event.activityId);
    const schedule = await this.createSchedule(event);
    await this.sendEmail(schedule);
  }

  async checkOrderAvailable(orderActivityId: number): Promise<void> {
    const orderActivity = await this.loadOrderActivityWithIncludes(orderActivityId);

    await this.checkOrderPayment(orderActivity.order);

    if (orderActivity.orderPackage) await this.checkOrderPackage(orderActivity);
    else await this.checkActivity(orderActivity);
  }

  private async createSchedule(event: Event) {
    return Schedule.create({
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

  private async getEvent(eventId: number): Promise<Event> {
    const event = await Event.findByPk(eventId);

    if (!event) throw new CustomError('Invalid activity schedule', 400);

    return event.toJSON() as Event;
  }

  private async checkAvailableTime(event: Event): Promise<void> {
    if (isPast(new Date(`${this.formatedDate}T${event.start}`)))
      throw new CustomError('Cannot be scheduled on this time');

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

    if (maxSchedules <= countSchedules) throw new CustomError('Time is not available', 400);
  }

  private async checkOrderPayment(order: Order): Promise<void> {
    if (!PAID_STATUS.includes(order.status)) throw new CustomError('Check your order payment status');
  }

  private async checkOrderPackage(orderActivity: OrderActivity): Promise<void> {
    this.checkPackageExpirationDate(orderActivity);
    await this.checkPackageAppointments(orderActivity);
    await this.checkPackageAmount(orderActivity);
    await this.checkPackageMinutes(orderActivity);
  }

  private async checkActivity(orderActivity: OrderActivity): Promise<void> {
    const { order } = orderActivity;
    const count = await this.countScheduleByOrderActivity(orderActivity.id);
    if (count + 1 > order.quantity) throw new CustomError('Limit of appointments was exceeded');
  }

  private async checkPackageMinutes(orderActivity: OrderActivity) {
    const { orderPackage, order } = orderActivity;

    if (orderPackage.type !== PackageTypeEnum.minutes) return;

    const [startDate, endDate] = this.getDateRange(this.date, orderPackage.recurrencyPay);
    const total = order.quantity * Number(orderPackage.total);
    const sum = await this.sumScheduledDuration(startDate, endDate, orderPackage.id);

    if (sum + orderActivity.duration > total) throw new CustomError('Total minutes was exceeded');
  }

  private async checkPackageAmount(orderActivity: OrderActivity) {
    const { orderPackage, order } = orderActivity;

    if (orderPackage.type !== PackageTypeEnum.amount) return;

    const [startDate, endDate] = this.getDateRange(this.date, orderPackage.recurrencyPay);
    const total = order.quantity * Number(orderPackage.total);
    const sum = await this.sumScheduledPrice(startDate, endDate, orderPackage.id);

    if (sum + Number(orderActivity.price) > total) throw new CustomError('Total amount was exceeded');
  }

  private async checkPackageAppointments(orderActivity: OrderActivity) {
    const { orderPackage, order } = orderActivity;

    if (orderPackage.type !== PackageTypeEnum.appointments) return;

    const [startDate, endDate] = this.getDateRange(this.date, orderPackage.recurrencyPay);

    const countSchedules = await this.countSchedule(startDate, endDate, orderActivity.id);

    const total = order.quantity * orderActivity.packageQuantity;

    if (countSchedules + 1 > total) throw new CustomError('Limit of appointments was exceeded');
  }

  private checkPackageExpirationDate(orderActivity: OrderActivity) {
    const { orderPackage } = orderActivity;
    if (orderPackage.expiration && orderPackage.expiration < this.date) throw new CustomError('Package expired');
  }

  private async countSchedule(start: Date, end: Date, orderActivityId?: number) {
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

  private async countScheduleByOrderActivity(orderActivityId: number): Promise<number> {
    return Schedule.count({
      where: {
        orderActivityId: orderActivityId,
        status: { [Op.ne]: ScheduleStatusEnum.Canceled }
      }
    });
  }

  private sumScheduledPrice(start: Date, end: Date, orderPackageId: number) {
    return this.sumScheduledOrderActivityAttribute('price', start, end, orderPackageId);
  }

  private sumScheduledDuration(start: Date, end: Date, orderPackageId: number) {
    return this.sumScheduledOrderActivityAttribute('duration', start, end, orderPackageId);
  }

  private async sumScheduledOrderActivityAttribute(attribute: string, start: Date, end: Date, orderPackageId: number) {
    const prices = await Schedule.findAll({
      attributes: [],
      include: [{ association: 'orderActivity', attributes: [attribute] }],
      where: {
        [Op.and]: [
          { date: { [Op.gte]: format(start, 'yyyy-MM-dd') } },
          { date: { [Op.lte]: format(end, 'yyyy-MM-dd') } },
          { status: { [Op.ne]: ScheduleStatusEnum.Canceled } },
          { '$orderActivity.order_package_id$': orderPackageId }
        ]
      }
    });

    return prices.map(x => Number(x.orderActivity[attribute])).reduce((acc, current) => acc + current, 0);
  }

  private async loadOrderActivityWithIncludes(orderActivityId: number): Promise<OrderActivity> {
    return OrderActivity.findByPk(orderActivityId, {
      include: ['order', 'orderPackage']
    });
  }

  private getDateRange(date: Date, recurrency: RecurrencyPayEnum): [Date, Date] {
    if (recurrency === RecurrencyPayEnum.weekly) {
      return [startOfWeek(date), endOfWeek(date)];
    }

    if (recurrency === RecurrencyPayEnum.monthly) {
      return [startOfMonth(date), endOfMonth(date)];
    }

    return [date, date];
  }

  private async sendEmail(schedule: Schedule) {
    const { name, email } = await this.getCustomer();
    const { title, date, start, end } = schedule;
    await sendEmailSchedule.sendCreate({
      name,
      email,
      title,
      date: formatDateToDisplay(date),
      start: formatTime24To12(start),
      end: formatTime24To12(end)
    });
  }

  private async getCustomer(): Promise<Customer> {
    return Customer.findByPk(this.customerId);
  }
}
