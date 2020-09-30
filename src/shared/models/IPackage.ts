import { IActivityWithPackageActivity } from './IActivity';
import ICategory from './ICategory';

export default interface IPackage {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  expiration?: Date;
  showInApp: boolean;
  showInWeb: boolean;
  categoryId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPackageWithIncludes extends IPackage {
  category?: ICategory;
  activities?: IActivityWithPackageActivity[];
}
