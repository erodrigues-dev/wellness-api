import { Request, Response, NextFunction } from 'express'

import IFile from '../../shared/utils/interfaces/IFile'

export interface IIndexRequest extends Request<any, any, any, any> {
  query: {
    name?: string
    email?: string
    page?: number
    limit?: number
  }
}

export interface IGetRequest extends Request<any, any, any, any> {
  params: {
    id: number
  }
}

export interface IStoreRequest extends Request<any, any, any, any> {
  file?: IFile
  body: {
    name: string
    email: string
    password: string
  }
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  file?: IFile
  body: {
    id: number
    name: string
    email: string
    password: string
  }
}

export default interface ICustomerController {
  index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>

  get(req: IGetRequest, res: Response, next: NextFunction): Promise<Response>

  store(
    req: IStoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>

  update(
    req: IUpdateRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>
}
