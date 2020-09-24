import ICustomPackage, {
  ICustomPackageWithActivity
} from '../../models/ICustomPackage';

export interface IFilter {
  customerId: number;
  name?: string;
  activityName?: string;
}

export default interface ICustomPackageService {
  list(filter: IFilter, page: number, limit: number): Promise<ICustomPackage[]>;
  count(filter: IFilter): Promise<number>;
  get(customerId: number, id: number): Promise<ICustomPackage>;
  create(data: ICustomPackageWithActivity): Promise<number>;
  update(data: ICustomPackageWithActivity): Promise<number>;
  destroy(customerId: number, id: number): Promise<void>;
}
