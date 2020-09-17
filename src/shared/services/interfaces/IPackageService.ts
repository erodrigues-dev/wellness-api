import IPackage from '../../models/IPackage';

export interface IFilter {
  name?: string;
  activityName?: string;
}

export default interface IPackageService {
  list(filter: IFilter, page: number, limit: number): Promise<IPackage[]>;
  count(filter: IFilter): Promise<number>;
  get(id: number): Promise<IPackage>;
  create(data: IPackage): Promise<IPackage>;
  update(data: IPackage): Promise<IPackage>;
}
