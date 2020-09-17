import IActivity from './IActivity';

export default interface IPackage {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  expiration?: Date;
  showInApp: boolean;
  showInWeb: boolean;

  activities?: IActivity[];

  createdAt?: Date;
  updatedAt?: Date;
}
