import { IActivityWithCustomPackageActivity } from './IActivity';

export default interface ICustomPackage {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  expiration?: Date;
  showInApp: boolean;
  showInWeb: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICustomPackageWithActivity extends ICustomPackage {
  activities?: IActivityWithCustomPackageActivity[];
}
