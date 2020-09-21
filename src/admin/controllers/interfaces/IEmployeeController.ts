import { Request, Response, NextFunction } from 'express';
import { ICloudFile } from '../../../shared/utils/interfaces/ICloudFile';

export interface IIndexRequest extends Request<any, any, any, any> {
  query: {
    name?: string;
    email?: string;
    specialty?: string;
    profile?: string;
    page?: number;
    limit?: number;
  };
}

export interface IGetRequest extends Request<any, any, any, any> {
  params: {
    id: number;
  };
}

export interface IStoreRequest extends Request<any, any, any, any> {
  file: ICloudFile;
  body: {
    name: string;
    email: string;
    password: string;
    specialty: string;
    profileId: number;
  };
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  file: ICloudFile;
  body: {
    id: number;
    name: string;
    email: string;
    password: string;
    specialty: string;
    profileId: number;
  };
}

export default interface IEmployeeController {
  index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;

  get(req: IGetRequest, res: Response, next: NextFunction): Promise<Response>;

  store(
    req: IStoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;

  update(
    req: IUpdateRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}
