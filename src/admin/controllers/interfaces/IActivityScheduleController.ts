import { Request, Response, NextFunction } from 'express';

import { EndsInEnum } from '../../../shared/models/enums/EndsInEnum';
import { FrequencyEnum } from '../../../shared/models/enums/FrequencyEnum';

export interface IIndexRequest extends Request<any, any, any, any> {
  query: {
    start: string;
    end: string;
    activityId?: number;
  };
}

export interface IStoreRequest extends Request<any, any, any, any> {
  body: {
    activityId: number;
    title: string;
    color: string;
    date: Date;
    start: string;
    end: string;
    recurrent: boolean;
    repeatEvery?: number;
    frequency?: FrequencyEnum;
    weekdays?: string;
    endsIn?: EndsInEnum;
    until?: Date;
    ocurrences?: number;
  };
}

export interface IUpdateRequest extends Request<any, any, any, any> {
  body: {
    id: number;
    activityId: number;
    title: string;
    color: string;
    date: Date;
    start: string;
    end: string;
    recurrent: boolean;
    repeatEvery?: number;
    frequency?: FrequencyEnum;
    weekdays?: string;
    endsIn?: EndsInEnum;
    until?: Date;
    ocurrences?: number;
  };
}

export interface IDeleteRequest extends Request<any, any, any, any> {
  params: {
    id: number;
  };
}

export default interface IActivityScheduleController {
  index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;

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

  delete(
    req: IDeleteRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}
