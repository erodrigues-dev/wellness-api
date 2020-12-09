import IPackage from '../../models/entities/IPackage';

export interface IFilter {
  name?: string;
  activityName?: string;
  categoryId?: number;
}

export default interface IPackageService {
  list(filter: IFilter, page: number, limit: number): Promise<IPackage[]>;
  count(filter: IFilter): Promise<number>;
  get(id: number): Promise<IPackage>;
}
