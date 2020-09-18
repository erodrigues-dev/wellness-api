import IProfile from '../../models/IProfile';

export interface IFilter {
  name?: string;
  description?: string;
}

export default interface IProfileService {
  list(filter: IFilter, page: number, limit: number): Promise<IProfile[]>;
  count(filter: IFilter): Promise<number>;
  get(id: number): Promise<IProfile>;
  create(data: IProfile): Promise<IProfile>;
  update(data: IProfile): Promise<IProfile>;
}
