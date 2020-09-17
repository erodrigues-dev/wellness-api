import IEmployee from './IEmployee';
import IPackage from './IPackage';

export default interface IActivity {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  employeeId: number;

  employee?: IEmployee;
  packages?: IPackage[];
  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
