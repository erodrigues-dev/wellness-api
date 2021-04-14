import { format, isEqual, isFuture, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import RRule, { WeekdayStr } from 'rrule';
import { Op } from 'sequelize';

import Event from '../../database/models/Event';
import Schedule from '../../database/models/Schedule';
import { EndsInEnum } from '../../models/enums/EndsInEnum';
import { convertToRRuleFrequency } from '../../models/enums/FrequencyEnum';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

class DayDto {
  constructor(
    public eventId: number,
    public maxPeople: number,
    public date: Date
  ) {}
}

export class ListDaysUseCase {
  today: Date;

  constructor(
    private activityId: number,
    private startDate: Date,
    private endDate: Date
  ) {
    this.today = startOfDay(new Date());
  }

  async list(): Promise<string[]> {
    if (!this.intervalIsValid()) return [];

    const events = await this.listEvents();
    const days = this.buildDays(events);
    const ids = days.map(x => x.eventId).filter(this.removeDuplicates);
    const scheduleds = await this.searchScheduleds(ids);
    const daysAvailables = this.getDaysAvailables(days, scheduleds);

    return daysAvailables
      .filter(day => this.filterEqualOrFutureDate(day))
      .map(day => day.date)
      .sort(this.sort)
      .map(this.convertToISOStringDateOnly)
      .filter(this.removeDuplicates);
  }

  private async listEvents() {
    const times = await Event.findAll({
      where: {
        activityId: this.activityId,
        date: {
          [Op.lte]: this.endDate
        },
        [Op.or]: [
          {
            date: { [Op.gte]: this.startDate }
          },
          {
            endsIn: [EndsInEnum.NEVER, EndsInEnum.AFTER]
          },
          {
            endsIn: EndsInEnum.IN,
            until: { [Op.lte]: this.endDate }
          }
        ]
      },
      include: [
        {
          association: 'activity',
          attributes: ['maxPeople']
        }
      ]
    });

    return times.map(time => time.toJSON() as Event);
  }

  private buildDays(times: Event[]) {
    const notRecurrentsDays = times
      .filter(event => !event.recurrent)
      .map(
        event =>
          new DayDto(
            event.id,
            event.activity.maxPeople ?? 1,
            parseISO(event.date as any)
          )
      );

    const recurrentsDays = times
      .filter(x => [EndsInEnum.NEVER, EndsInEnum.AFTER].includes(x.endsIn))
      .map(x => this.getRecurrentItems(x))
      .reduce(this.flatArray, []);

    return notRecurrentsDays
      .concat(recurrentsDays)
      .filter(day => this.filterEqualOrFutureDate(day));
  }

  private async searchScheduleds(eventIds: number[]) {
    const list = await Schedule.findAll({
      where: {
        [Op.and]: [
          { date: { [Op.gte]: this.startDate } },
          { date: { [Op.lte]: this.endDate } },
          { activityScheduleId: { [Op.in]: eventIds } },
          { status: { [Op.ne]: ScheduleStatusEnum.Canceled } }
        ]
      },
      attributes: ['activityScheduleId', 'date']
    });

    return list.map(item => item.toJSON() as Schedule);
  }

  private getRecurrentItems(time: Event) {
    const rrule = new RRule({
      dtstart: parseISO(time.date as any),
      interval: time.repeatEvery,
      freq: convertToRRuleFrequency(time.frequency),
      count: time.ocurrences,
      byweekday: time.weekdays?.split(',') as WeekdayStr[]
    });

    const dates = rrule.between(this.startDate, this.endDate, true);

    return dates.map(
      date => new DayDto(time.id, time.activity.maxPeople ?? 1, date)
    );
  }

  private getDaysAvailables(days: DayDto[], scheduleds: Schedule[]) {
    const returnDays: DayDto[] = [];

    days.forEach(day => {
      const totalScheduleds = scheduleds.filter(
        x =>
          x.activityScheduleId === day.eventId &&
          x.date === format(day.date, 'yyyy-MM-dd')
      ).length;

      if (day.maxPeople > totalScheduleds) returnDays.push(day);
    });

    return returnDays;
  }

  private flatArray(previus: any[], current: any[]) {
    return [...current, ...previus];
  }

  private sort(a: Date, b: Date) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  private removeDuplicates(current: any, index: number, array: any[]) {
    return array.findIndex(item => item === current) === index;
  }

  private convertToISOStringDateOnly(current: Date) {
    return format(current, 'yyyy-MM-dd');
  }

  private intervalIsValid() {
    if (isFuture(this.startDate)) return true;

    return isWithinInterval(this.today, {
      start: this.startDate,
      end: this.endDate
    });
  }

  private filterEqualOrFutureDate(item: DayDto) {
    return isEqual(item.date, this.today) || isFuture(item.date);
  }
}