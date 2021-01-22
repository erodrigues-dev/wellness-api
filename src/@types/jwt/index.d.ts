import { LoginViewModel } from '../../shared/models/viewmodels/LoginViewModel';

declare global {
  namespace Express {
    interface Request {
      user?: LoginViewModel;
    }
  }
}
