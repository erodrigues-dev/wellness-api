import { Response, NextFunction } from 'express';

import employeeService from './../shared/services/EmployeeService';
import IEmployeeService from '../shared/services/interfaces/IEmployeeService';

import IEmployeeController, {
  IGetRequest,
  IIndexRequest,
  IStoreRequest,
  IUpdateRequest
} from './interfaces/IEmployeeController';

export class EmployeeController implements IEmployeeController {
  constructor(private service: IEmployeeService) {}

  async index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, email, specialty, profile, page, limit } = req.query;
      const total = await this.service.count({
        name,
        email,
        specialty,
        profile
      });
      const list = await this.service.list(
        { name, email, specialty, profile },
        page,
        limit
      );
      return res.header('X-Total-Count', total.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(
    req: IGetRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const model = await this.service.get(id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(
    req: IStoreRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, email, specialty, password, profileId } = req.body;
      const model = await this.service.create({
        name,
        email,
        specialty,
        password,
        profileId,
        imageUrl: req.file?.url
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: IUpdateRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id, name, email, specialty, password, profileId } = req.body;
      const model = await this.service.update({
        id,
        name,
        email,
        specialty,
        password,
        profileId,
        imageUrl: req.file?.url
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

export default new EmployeeController(employeeService);
