import RRule from 'rrule';
import { Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Event from '../database/models/Event';
import IEvent from '../models/entities/IEvent';
import { EndsInEnum } from '../models/enums/EndsInEnum';
import { convertToRRuleFrequency } from '../models/enums/FrequencyEnum';
import IEventService from './interfaces/IEventService';

export class EventService implements IEventService {
  private db = Event;

  async list(start: Date, end: Date, activityId: number): Promise<IEvent[]> {
    const where = this.buildQuery(start, end, activityId);
    const rows: Event[] = await this.db.findAll({
      where,
      order: ['date']
    });

    return rows
      .map(row => row.toJSON() as IEvent)
      .filter(item => this.filterWithRRule(start, end, item));
  }

  async listDays(start: Date, end: Date) {}

  async create(data: IEvent): Promise<number> {
    const { id } = await this.db.create(data);

    return id;
  }

  async update(data: IEvent): Promise<void> {
    const { id } = data;
    const model: Event = await this.db.findByPk(id);
    if (!model) throw new CustomError('Schedule not found', 404);

    model.activityId = data.activityId;
    model.title = data.title;
    model.color = data.color;
    model.date = data.date;
    model.start = data.start;
    model.end = data.end;
    model.recurrent = data.recurrent ?? false;
    model.repeatEvery = data.repeatEvery || null;
    model.frequency = data.frequency || null;
    model.weekdays = data.weekdays || null;
    model.endsIn = data.endsIn || null;
    model.until = data.until || null;
    model.ocurrences = data.ocurrences || null;

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
          endsIn: [EndsInEnum.NEVER, EndsInEnum.AFTER]
        },
        {
          endsIn: EndsInEnum.IN,
          until: { [Op.lte]: end }
        }
      ]
    };

    if (activityId) query['activityId'] = activityId;

    return query;
  }

  private filterWithRRule(start: Date, end: Date, item: IEvent) {
    if (item.endsIn === EndsInEnum.AFTER) {
      const rrule = new RRule({
        dtstart: new Date(item.date),
        interval: item.repeatEvery,
        freq: convertToRRuleFrequency(item.frequency),
        count: item.ocurrences
      });
      return rrule.between(start, end, true).length;
    }

    return true;
  }
}

export default new EventService();
