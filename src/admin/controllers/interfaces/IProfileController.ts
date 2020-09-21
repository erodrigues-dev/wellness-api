import { Request, Response, NextFunction } from 'express';

export interface IIndexRequest extends Request<any, any, any, any> {
  query: {
    name?: string;
    description?: string;
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
  body: {
    name: string;
    description: string;
    functionalities: {
      name: string;
      actions: number;
    }[];
  };
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  body: {
    id: number;
    name: string;
    description: string;
    functionalities: {
      name: string;
      actions: number;
    }[];
  };
}

export default interface IProfileController {
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
