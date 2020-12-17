import Schedule from '../database/models/Schedule';
import { ScheduleViewModel } from '../models/viewmodels/ScheduleViewModel';

export class FilterDto {
  constructor(
    public customerId?: number,
    public page: number = 1,
    public limit: number = 10
  ) {}

  buildWhere() {
    const where = {};

    if (this.customerId !== null) where['customerId'] = this.customerId;

    return where;
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
            date: row.activitySchedule.date,
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
        'activitySchedule'
      ]
    });

    const dto = new ListDto();
    dto.total = count;
    dto.rows = rows;

    return dto;
  }
}

export default new ScheduleService();
