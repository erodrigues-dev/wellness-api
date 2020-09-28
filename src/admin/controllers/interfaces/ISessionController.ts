import { Request, Response, NextFunction } from 'express';
import { ICloudFile } from '../../../shared/utils/interfaces/ICloudFile';

export interface ILoginRequest extends Request<any, any, any, any> {
  body: {
    email: string;
    password: string;
  };
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  user: {
    id: number;
  };
  file: ICloudFile;
  body: {
    name: string;
    email: string;
    password: string;
    specialty: string;
  };
}

export default interface ISessionController {
  login(
    req: ILoginRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;

  update(
    req: IUpdateRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}
