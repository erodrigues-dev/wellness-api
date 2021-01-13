import { Request, Response, NextFunction } from 'express';
import { ICloudFile } from '../../../shared/utils/interfaces/ICloudFile';

export interface IIndexRequest extends Request<any, any, any, any> {
  query: {
    name?: string;
    employeeId?: number;
    categoryId?: number;
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
    description: string;
    price: number;
    duration: number;
    employeeId: number;
    categoryId: number;
    showInApp: boolean;
    showInWeb: boolean;
    maxPeople?: number;
  };
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  file: ICloudFile;
  body: {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    employeeId: number;
    categoryId: number;
    showInApp: boolean;
    showInWeb: boolean;
    maxPeople?: number;
  };
}

export default interface IActivityController {
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
