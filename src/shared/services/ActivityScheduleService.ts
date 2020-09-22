import { Op } from 'sequelize';
import RRule from 'rrule';

import { EndsInEnum } from './../models/enums/EndsInEnum';
import { convertToRRuleFrequency } from '../models/enums/FrequencyEnum';
import IActivitySchedule from '../models/IActivitySchedule';
import ActivitySchedule from '../database/models/ActivitySchedule';
import IActivityScheduleService from './interfaces/IActivityScheduleService';
import CustomError from '../custom-error/CustomError';

export class ActivityScheduleService implements IActivityScheduleService {
  private db = ActivitySchedule;

  async list(
    start: Date,
    end: Date,
    activityId?: number
  ): Promise<IActivitySchedule[]> {
    const where = this.buildQuery(start, end, activityId);
    const rows: ActivitySchedule[] = await this.db.findAll({
      where,
      order: ['date']
    });

    return rows
      .map(row => row.toJSON() as IActivitySchedule)
      .filter(item => this.filterWithRRule(start, end, item));
  }

  async create(data: IActivitySchedule): Promise<number> {
    const { id } = await this.db.create(data);

    return id;
  }

  async update(data: IActivitySchedule): Promise<void> {
    const { id } = data;
    const model: ActivitySchedule = await this.db.findByPk(id);
    if (!model) throw new CustomError('Schedule not found', 404);

    model.activityId = data.activityId;
    model.title = data.title;
    model.color = data.color;
    model.date = data.date;
    model.start = data.start;
    model.end = data.end;
    model.recurrent = data.recurrent ?? false;
    model.recurrentRepeatEvery = data.recurrentRepeatEvery || null;
    model.recurrentFrequency = data.recurrentFrequency || null;
    model.recurrentWeekdays = data.recurrentWeekdays || null;
    model.recurrentEndsIn = data.recurrentEndsIn || null;
    model.recurrentUntil = data.recurrentUntil || null;
    model.recurrentOcurrences = data.recurrentOcurrences || null;

    await model.save();
  }

  async delete(id: number): Promise<void> {
    const rows = await this.db.destroy({
      where: { id }
    });

    if (rows === 0) throw new CustomError('Schedule not found', 404);
  }

  private buildQuery(start: Date, end: Date, activityId?: number) {
    const query = {
      date: { [Op.lte]: end },
      [Op.or]: [
        {
          date: { [Op.gte]: start }
        },
        {
          recurrentEndsIn: [EndsInEnum.NEVER, EndsInEnum.AFTER]
        },
        {
          recurrentEndsIn: EndsInEnum.IN,
          recurrentUntil: { [Op.lte]: end }
        }
      ]
    };

    if (activityId) query['activityId'] = activityId;

    return query;
  }

  private filterWithRRule(start: Date, end: Date, item: IActivitySchedule) {
    if (item.recurrentEndsIn === EndsInEnum.AFTER) {
      const rrule = new RRule({
        dtstart: new Date(item.date),
        interval: item.recurrentRepeatEvery,
        freq: convertToRRuleFrequency(item.recurrentFrequency),
        count: item.recurrentOcurrences
      });
      return rrule.between(start, end, true).length;
    }

    return true;
  }
}

export default new ActivityScheduleService();
