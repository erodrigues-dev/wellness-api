import { IActivityWithCustomPackageActivity } from './IActivity';

export default interface ICustomPackage {
  id?: number;
  customerId: number;
  name: string;
  price: number;
  description: string;
  expiration?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICustomPackageWithActivity extends ICustomPackage {
  activities?: IActivityWithCustomPackageActivity[];
}
