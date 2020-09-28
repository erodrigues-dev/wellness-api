import ILoginResponse from './ILoginResponse';

export interface IUpdateData {
  id: number;
  name: string;
  email: string;
  password: string;
  specialty: string;
  imageUrl: string;
}

export default interface IUserService {
  login(email: string, password: string): Promise<ILoginResponse>;
  update(data: IUpdateData): Promise<void>;
}
