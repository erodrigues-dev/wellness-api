import IActivitySchedule from '../../models/IActivitySchedule';

export default interface IActivityScheduleService {
  list(
    start: Date,
    end: Date,
    activityId: number
  ): Promise<IActivitySchedule[]>;
  create(data: IActivitySchedule): Promise<number>;
  update(data: IActivitySchedule): Promise<void>;
  delete(id: number): Promise<void>;
}
