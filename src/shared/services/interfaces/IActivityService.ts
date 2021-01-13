import IActivity from '../../models/entities/IActivity';

export interface IActivityFilter {
  name?: string;
  employeeId?: number;
  categoryId?: number;
}

export default interface IActivityService {
  list(
    filter: IActivityFilter,
    page: number,
    limit: number
  ): Promise<IActivity[]>;
  count(filter: IActivityFilter): Promise<number>;
  get(id: number): Promise<IActivity>;
  create(data: IActivity): Promise<IActivity>;
  update(data: IActivity): Promise<IActivity>;
}
