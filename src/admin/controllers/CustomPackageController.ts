import { NextFunction, Response } from 'express';

import IActivity from '../../shared/models/entities/IActivity';
import customPackageService from '../../shared/services/CustomPackageService';
import ICustomPackageService from '../../shared/services/interfaces/ICustomPackageService';
import ICustomPackageController, {
    IDestroyRequest, IGetRequest, IIndexRequest, IStoreRequest, IUpdateRequest
} from './interfaces/ICustomPackageController';

export class CustomPackageController implements ICustomPackageController {
  constructor(private service: ICustomPackageService) {}

  async index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { customerId } = req.params;
      const { name, activityName, page, limit } = req.query;
      const count = await this.service.count({
        customerId,
        name,
        activityName
      });
      const list = await this.service.list(
        { customerId, name, activityName },
        page,
        limit
      );
      return res.header('X-Total-count', count.toString()).json(list);
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
      const { id, customerId } = req.params;
      const model = await this.service.get(Number(customerId), Number(id));
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
      const { customerId } = req.params;
      const { name, price, description, expiration, activities } = req.body;
      const id = await this.service.create({
        customerId,
        name,
        price,
        description,
        expiration,
        activities: activities as IActivity[]
      });

      return res.json({ id });
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
      const { customerId } = req.params;
      const { id, name, price, description, expiration, activities } = req.body;
      await this.service.update({
        id,
        customerId: +customerId,
        name,
        price,
        description,
        expiration,
        activities: activities as IActivity[]
      });

      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  async destroy(
    req: IDestroyRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { customerId, id } = req.params;
      await this.service.destroy(+customerId, +id);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new CustomPackageController(customPackageService);
