import { Request, Response, NextFunction } from 'express';

import IFile from '../../shared/utils/interfaces/IFile';

export interface IIndexRequest extends Request<any, any, any, any> {
  query: {
    name?: string;
    employeeId?: number;
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
  file?: IFile;
  body: {
    name: string;
    description: string;
    price: number;
    duration: number;
    employeeId: number;
  };
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  file?: IFile;
  body: {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    employeeId: number;
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
