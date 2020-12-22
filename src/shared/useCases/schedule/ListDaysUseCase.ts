import { format, formatISO, parseISO, parseJSON } from 'date-fns';
import RRule, { WeekdayStr } from 'rrule';
import { Op } from 'sequelize';
import { all } from 'sequelize/types/lib/operators';

import ActivitySchedule from '../../database/models/ActivitySchedule';
import Schedule from '../../database/models/Schedule';
import { EndsInEnum } from '../../models/enums/EndsInEnum';
import { convertToRRuleFrequency } from '../../models/enums/FrequencyEnum';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';

class DayDto {
  constructor(
    public activityScheduleId: number,
    public maxPeople: number,
    public date: Date
  ) {}
}

export class ListDaysUseCase {
  constructor(
    private activityId: number,
    private startDate: Date,
    private endDate: Date
  ) {}

  async list(): Promise<string[]> {
    const times = await this.listTimes();
    const days = this.buildDays(times);
    const ids = days.map(x => x.activityScheduleId);
    const scheduleds = await this.searchScheduleds(ids);
    const daysAvailables = this.getDaysAvailables(days, scheduleds);

    return daysAvailables
      .map(x => x.date)
      .sort(this.sort)
      .map(this.convertToISOString)
      .filter(this.removeDuplicates);
  }

  private async listTimes() {
    const times = await ActivitySchedule.findAll({
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

    return times.map(time => time.toJSON() as ActivitySchedule);
  }

  private buildDays(times: ActivitySchedule[]) {
    const notRecurrentsDays = times
      .filter(activitySchedule => !activitySchedule.recurrent)
      .map(
        activitySchedule =>
          new DayDto(
            activitySchedule.id,
            activitySchedule.activity.maxPeople ?? 1,
            parseISO(activitySchedule.date as any)
          )
      );

    const recurrentsDays = times
      .filter(x => [EndsInEnum.NEVER, EndsInEnum.AFTER].includes(x.endsIn))
      .map(x => this.getRecurrentItems(x))
      .reduce(this.flatArray, []);

    const allDays = notRecurrentsDays.concat(recurrentsDays);

    return allDays;
  }

  private async searchScheduleds(timeIds: number[]) {
    const list = await Schedule.findAll({
      where: {
        [Op.and]: [
          { date: { [Op.gte]: this.startDate } },
          { date: { [Op.lte]: this.endDate } },
          { activityScheduleId: { [Op.in]: timeIds } },
          { status: { [Op.ne]: ScheduleStatusEnum.Canceled } }
        ]
      },
      attributes: ['activityScheduleId', 'date']
    });

    return list.map(item => item.toJSON() as Schedule);
  }

  private getRecurrentItems(time: ActivitySchedule) {
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
          x.activityScheduleId === day.activityScheduleId &&
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
    return array.findIndex(date => date === current) === index;
  }

  private convertToISOString(current: Date) {
    return format(current, 'yyyy-MM-dd');
  }
}
