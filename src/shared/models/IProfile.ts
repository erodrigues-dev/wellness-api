import IEmployee from './IEmployee';
import IFunctionality from './IFunctionality';

export default interface IProfile {
  id?: number;
  name: string;
  description: string;

  functionalities: IFunctionality[];
  employees: IEmployee[];

  createdAt: Date;
  updatedAt: Date;
}
