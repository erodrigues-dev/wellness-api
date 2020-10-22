import ILoginResponse from '../../shared/services/interfaces/ILoginResponse';

declare global {
  namespace Express {
    interface Request {
      user?: ILoginResponse;
    }
  }
}
