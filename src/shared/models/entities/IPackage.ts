import { PackageTypeEnum } from '../enums/PackageTypeEnum';
import { RecurrencyPayEnum } from '../enums/RecurrencyPayEnum';
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

  recurrencyPay: RecurrencyPayEnum;
  type: PackageTypeEnum;
  total?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPackageWithIncludes extends IPackage {
  category?: ICategory;
  activities?: any[];
}
