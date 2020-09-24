import { ICloudFile } from '../../../shared/utils/interfaces/ICloudFile';
import { Request, Response, NextFunction } from 'express';

export interface IIndexRequest extends Request<any, any, any, any> {
  params: {
    customerId: number;
  };

  query: {
    name?: string;
    activityName?: string;
    page?: number;
    limit?: number;
  };
}

export interface IGetRequest extends Request<any, any, any, any> {
  params: {
    customerId: number;
    id: number;
  };
}

export interface IDestroyRequest extends IGetRequest {}

export interface IStoreRequest extends Request<any, any, any, any> {
  params: {
    customerId: number;
  };

  body: {
    name: string;
    price: number;
    description: string;
    expiration?: Date;
    activities: {
      id: number;
      quantity: number;
    }[];
  };
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  params: {
    customerId: number;
  };

  body: {
    id: number;
    name: string;
    price: number;
    description: string;
    expiration?: Date;
    activities: {
      id: number;
      quantity: number;
    }[];
  };
}

export default interface ICustomPackageController {
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

  update(
    req: IDestroyRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}
