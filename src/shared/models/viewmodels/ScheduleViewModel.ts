import { ScheduleStatusEnum } from '../enums/ScheduleStatusEnum';

export class ScheduleViewModel {
  id: number;
  customer: {
    id: number;
    name: string;
  };
  activity: {
    id: number;
    name: string;
  };
  date: Date;
  start: string;
  end: string;
  status: ScheduleStatusEnum;
}
