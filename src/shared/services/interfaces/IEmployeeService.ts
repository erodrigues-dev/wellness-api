import IEmployee from '../../models/entities/IEmployee';

export interface IFilter {
  name?: string;
  email?: string;
  specialty?: string;
  profile?: string;
}

export default interface IEmployeeService {
  list(filter: IFilter, page: number, limit: number): Promise<IEmployee[]>;
  count(filter: IFilter): Promise<number>;
  get(id: number): Promise<IEmployee>;
  create(data: IEmployee): Promise<IEmployee>;
  update(data: IEmployee): Promise<IEmployee>;
}
