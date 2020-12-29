import { parseISO } from 'date-fns';
import RRule, { WeekdayStr } from 'rrule';
import { Op } from 'sequelize';

import ActivitySchedule from '../../database/models/ActivitySchedule';
import Schedule from '../../database/models/Schedule';
import { convertToRRuleFrequency } from '../../models/enums/FrequencyEnum';
import { ScheduleStatusEnum } from '../../models/enums/ScheduleStatusEnum';
import { ScheduleTimeViewModel } from '../../models/viewmodels/ScheduleTimeViewModel';

export class ListTimesUseCase {
  constructor(private activityId: number, private date: Date) {}

  async list() {
    const events = await this.listEvents();
    const dayEvents = events.filter(
      x => !x.recurrent || this.checkIfRecurrentEventHasOcurrenceInDate(x)
    );
    const eventIds = dayEvents.map(x => x.id);
    const scheduleds = await this.getScheduleds(eventIds);

    return dayEvents
      .filter(event => this.isAvailableTime(event, scheduleds))
      .map(this.mapToViewModel);
  }

  private checkIfRecurrentEventHasOcurrenceInDate(item: ActivitySchedule) {
    if (!item.recurrent) return false;

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

  private async listEvents() {
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
      include: [
        {
          association: 'activity',
          attributes: ['maxPeople']
        }
      ],
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

  private isAvailableTime(event: ActivitySchedule, scheduleds: Schedule[]) {
    const maxSchedules = event.activity.maxPeople ?? 1;
    const totalSchedules = scheduleds.filter(
      x => x.activityScheduleId === event.id
    ).length;

    return maxSchedules > totalSchedules;
  }

  private getScheduleds(eventIds: number[]) {
    return Schedule.findAll({
      where: {
        date: this.date,
        status: { [Op.ne]: ScheduleStatusEnum.Canceled },
        activityScheduleId: { [Op.in]: eventIds }
      }
    });
  }
}
