import IEmployee from './IEmployee';
import IPackage from './IPackage';

export default interface IActivity {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;

  employee: IEmployee;
  packages: IPackage[];

  createdAt: Date;
  updatedAt: Date;
}
