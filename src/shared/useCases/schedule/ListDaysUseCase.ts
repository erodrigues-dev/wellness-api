import RRule, { WeekdayStr } from 'rrule';
import { Op } from 'sequelize';

import ActivitySchedule from '../../database/models/ActivitySchedule';
import { EndsInEnum } from '../../models/enums/EndsInEnum';
import { convertToRRuleFrequency } from '../../models/enums/FrequencyEnum';

export class ListDaysUseCase {
  constructor(
    private activityId: number,
    private startDate: Date,
    private endDate: Date
  ) {}

  async list(): Promise<string[]> {
    const schedules = await this.listInDb();

    const fixeds = schedules
      .filter(x => !x.recurrent)
      .map(x => new Date(x.date));

    const recurrents = schedules
      .filter(x => [EndsInEnum.NEVER, EndsInEnum.AFTER].includes(x.endsIn))
      .map(x => this.getDates(x))
      .reduce(this.flatArray, []);

    const dates = fixeds
      .concat(recurrents)
      .sort(this.sort)
      .map(date => date.toISOString())
      .filter(this.removeDuplicates);

    return dates;
  }

  private async listInDb() {
    const list = await ActivitySchedule.findAll({
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
      }
    });

    return list.map(item => item.toJSON() as ActivitySchedule);
  }

  private getDates(item: ActivitySchedule) {
    const rrule = new RRule({
      dtstart: new Date(item.date),
      interval: item.repeatEvery,
      freq: convertToRRuleFrequency(item.frequency),
      count: item.ocurrences,
      byweekday: item.weekdays?.split(',') as WeekdayStr[]
    });

    return rrule.between(this.startDate, this.endDate, true);
  }

  private removeDuplicates(current: any, index: number, array: any[]) {
    return array.indexOf(current) === index;
  }

  private flatArray(previus: Date[], current: Date[]) {
    return [...current, ...previus];
  }

  private sort(a: Date, b: Date) {
    return a > b ? 1 : a < b ? -1 : 0;
  }
}
