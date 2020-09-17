import { Request, Response, NextFunction } from 'express';

export interface ILoginRequest extends Request<any, any, any, any> {
  body: {
    email: string;
    password: string;
  };
}

export default interface ISessionController {
  login(
    req: ILoginRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}
