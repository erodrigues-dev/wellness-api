import { format, parseISO } from 'date-fns';
import { FindOptions, Op } from 'sequelize';

import Schedule from '../database/models/Schedule';
import { ScheduleViewModel } from '../models/viewmodels/ScheduleViewModel';

export class FilterDto {
  customerId: number;
  activityId: number;
  dateStart: string;
  dateEnd: string;
  status: string;
  page: number = null;
  limit: number = null;

  static parse(obj: any) {
    const dto = new FilterDto();
    console.log('====================================');
    console.log(obj);
    console.log('====================================');

    dto.customerId = obj.customerId || null;
    dto.activityId = obj.activityId || null;
    dto.dateStart = obj.dateStart || null;
    dto.dateEnd = obj.dateEnd || null;
    dto.status = obj.status || null;

    if (!!obj.page && !!obj.limit) {
      dto.page = obj.page || null;
      dto.limit = obj.limit || null;
    }

    return dto;
  }

  buildWhere() {
    const ands = [];

    if (this.customerId) ands.push({ customerId: this.customerId });
    if (this.dateStart) ands.push({ date: { [Op.gte]: this.dateStart } });
    if (this.dateEnd) ands.push({ date: { [Op.lte]: this.dateEnd } });

    if (this.activityId)
      ands.push({ '$orderActivity.activity_id$': this.activityId });

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
              id: row.orderActivity.activityId,
              name: row.orderActivity.name
            },
            date: row.date,
            start: row.start,
            end: row.end,
            status: row.status
          } as ScheduleViewModel)
      );
  }
}

export class ScheduleService {
  async list(filter: FilterDto) {
    const findOptions: FindOptions = {
      where: filter.buildWhere(),
      include: [
        {
          association: 'customer',
          attributes: ['id', 'name']
        },
        {
          association: 'orderActivity'
        }
      ],
      order: [['date', 'desc']]
    };

    if (!!filter.page && !!filter.limit) {
      findOptions.limit = filter.limit;
      findOptions.offset = filter.offset;
    }

    const { rows, count } = await Schedule.findAndCountAll(findOptions);

    const dto = new ListDto();
    dto.total = count;
    dto.rows = rows;

    return dto;
  }
}

export default new ScheduleService();
