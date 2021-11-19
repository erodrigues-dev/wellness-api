import IEvent from '../../models/entities/IEvent';

export default interface IEventService {
  list(start: Date, end: Date, activityId: number): Promise<IEvent[]>;
  create(data: IEvent): Promise<number>;
  update(data: IEvent): Promise<void>;
  delete(id: number): Promise<void>;
}
