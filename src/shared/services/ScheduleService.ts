import { format, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Schedule from '../database/models/Schedule';
import { ScheduleViewModel } from '../models/viewmodels/ScheduleViewModel';

export class FilterDto {
  customerId: number;
  activityId: number;
  dateStart: string;
  dateEnd: string;
  status: string;
  page: number = 1;
  limit: number = 10;

  static parse(obj: any) {
    const dto = new FilterDto();

    dto.customerId = obj.customerId || null;
    dto.activityId = obj.activityId || null;
    dto.dateStart = obj.dateStart || null;
    dto.dateEnd = obj.dateEnd || null;
    dto.status = obj.status || null;

    dto.page = obj.page || 1;
    dto.limit = obj.limit || 10;

    return dto;
  }

  buildWhere() {
    const ands = [];

    if (this.customerId) ands.push({ customerId: this.customerId });
    if (this.dateStart) ands.push({ date: { [Op.gte]: this.dateStart } });
    if (this.dateEnd) ands.push({ date: { [Op.lte]: this.dateEnd } });

    if (this.activityId)
      ands.push({ '$activitySchedule.activity_id$': this.activityId });

    if (this.status) ands.push({ status: this.status });

    return {
      [Op.and]: ands
    };
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }
}

export class ListDto {
  total: number = 0;
  list: ScheduleViewModel[] = [];

  set rows(rows: Schedule[]) {
    this.list = rows
      .map(row => row.toJSON() as Schedule)
      .map(
        row =>
          ({
            id: row.id,
            customer: {
              id: row.customer.id,
              name: row.customer.name
            },
            activity: {
              id: row.activitySchedule.activityId,
              name: row.activitySchedule.title
            },
            date: row.date,
            start: row.activitySchedule.start,
            end: row.activitySchedule.end,
            status: row.status
          } as ScheduleViewModel)
      );
  }
}

export class ScheduleService {
  async list(filter: FilterDto) {
    const { rows, count } = await Schedule.findAndCountAll({
      where: filter.buildWhere(),
      limit: filter.limit,
      offset: filter.offset,
      include: [
        {
          association: 'customer',
          attributes: ['id', 'name']
        },
        {
          association: 'activitySchedule'
        }
      ]
    });

    const dto = new ListDto();
    dto.total = count;
    dto.rows = rows;

    return dto;
  }
}

export default new ScheduleService();
