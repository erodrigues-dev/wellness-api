import ILoginResponse from './ILoginResponse';

export default interface IUserService {
  login(email: string, password: string): Promise<ILoginResponse>;
}
