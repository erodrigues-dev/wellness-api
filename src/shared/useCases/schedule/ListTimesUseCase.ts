import { parseISO } from 'date-fns';
import RRule, { WeekdayStr } from 'rrule';
import { Op } from 'sequelize';

import ActivitySchedule from '../../database/models/ActivitySchedule';
import { convertToRRuleFrequency } from '../../models/enums/FrequencyEnum';
import { ScheduleTimeViewModel } from '../../models/viewmodels/ScheduleTimeViewModel';

export class ListTimesUseCase {
  constructor(private activityId: number, private date: Date) {}

  async list() {
    const schedules = await this.listInDb();

    const fixeds = schedules.filter(x => !x.recurrent);
    const recurrents = schedules
      .filter(item => item.recurrent)
      .filter(item => this.checkRecurrent(item));

    //TODO verificar disponibilidade

    return fixeds.concat(recurrents).map(this.mapToViewModel);
  }

  private checkRecurrent(item: ActivitySchedule) {
    const rrule = new RRule({
      dtstart: parseISO(item.date as any),
      until: item.until ? parseISO(item.until as any) : null,
      freq: convertToRRuleFrequency(item.frequency),
      byweekday: item.weekdays?.split(',') as WeekdayStr[],
      interval: item.repeatEvery,
      count: item.ocurrences
    });

    const events = rrule.between(this.date, this.date, true);

    return events.length === 1;
  }

  private async listInDb() {
    const list = await ActivitySchedule.findAll({
      where: {
        activityId: this.activityId,
        [Op.or]: [
          {
            date: this.date
          },
          {
            recurrent: true,
            date: { [Op.lte]: this.date },
            until: { [Op.or]: [{ [Op.gte]: this.date }, { [Op.is]: null }] }
          }
        ]
      },
      order: ['start']
    });

    return list.map(item => item.toJSON() as ActivitySchedule);
  }

  private mapToViewModel(item: ActivitySchedule): ScheduleTimeViewModel {
    return {
      id: item.id,
      title: item.title,
      start: item.start,
      end: item.end
    };
  }
}
