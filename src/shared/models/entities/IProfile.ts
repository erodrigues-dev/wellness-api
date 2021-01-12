import IEmployee from './IEmployee';

export default interface IProfile {
  id?: number;
  name: string;
  description: string;
  permission: number;

  employees?: IEmployee[];

  createdAt?: Date;
  updatedAt?: Date;
}
