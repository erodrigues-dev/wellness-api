import { ICloudFile } from './../../shared/utils/interfaces/ICloudFile';
import { Request, Response, NextFunction } from 'express';

export interface IIndexRequest extends Request<any, any, any, any> {
  query: {
    name?: string;
    activityName?: string;
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
    price: number;
    description: string;
    expiration?: Date;
    showInApp: boolean;
    showInWeb: boolean;
    activities: {
      id: number;
      quantity: number;
    }[];
  };
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  file: ICloudFile;
  body: {
    id: number;
    name: string;
    price: number;
    description: string;
    expiration?: Date;
    showInApp: boolean;
    showInWeb: boolean;
    activities: {
      id: number;
      quantity: number;
    }[];
  };
}

export default interface IPackageController {
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
