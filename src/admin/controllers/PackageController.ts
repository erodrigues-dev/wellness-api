import { NextFunction, Response } from 'express';

import IActivity from '../../shared/models/entities/IActivity';
import IPackageService from '../../shared/services/interfaces/IPackageService';
import packageService from '../../shared/services/PackageService';
import IPackageController, {
    IGetRequest, IIndexRequest, IStoreRequest, IUpdateRequest
} from './interfaces/IPackageController';

export class PackageController implements IPackageController {
  constructor(private service: IPackageService) {}

  async index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, activityName, categoryId, page, limit } = req.query;
      const count = await this.service.count({
        name,
        activityName,
        categoryId
      });
      const list = await this.service.list(
        { name, activityName, categoryId },
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
      const {
        name,
        price,
        description,
        expiration,
        showInApp,
        showInWeb,
        categoryId,
        activities,
        recurrencyPay,
        type,
        total
      } = req.body;
      const model = await this.service.create({
        name,
        price,
        description,
        expiration,
        showInApp,
        showInWeb,
        categoryId,
        activities: activities as IActivity[],
        imageUrl: req.file?.url,
        recurrencyPay,
        type,
        total
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
      const {
        id,
        name,
        price,
        description,
        expiration,
        showInApp,
        showInWeb,
        categoryId,
        activities,
        recurrencyPay,
        type,
        total
      } = req.body;
      const model = await this.service.update({
        id,
        name,
        price,
        description,
        expiration,
        showInApp,
        showInWeb,
        categoryId,
        activities: activities as IActivity[],
        imageUrl: req.file?.url,
        recurrencyPay,
        type,
        total
      });

      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

export default new PackageController(packageService);
