import ILoginResponse from '../../shared/models/responses/ILoginResponse';

declare global {
  namespace Express {
    interface Request {
      user?: ILoginResponse;
    }
  }
}
