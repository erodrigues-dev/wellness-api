import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PackageDTO } from '../../shared/models/dto/PackageDTO';
import IPackageService from '../../shared/services/interfaces/IPackageService';
import packageService, { PackageService } from '../../shared/services/PackageService';
import { PackageUseCase } from '../../shared/useCases/package/PackageUseCase';
import IPackageController, {
  IGetRequest,
  IIndexRequest,
  IStoreRequest,
  IUpdateRequest
} from './interfaces/IPackageController';

export class PackageController {
  constructor(private service: PackageService) {}

  async index(req: IIndexRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { name, activityName, categoryId, page, limit } = req.query;
      const count = await this.service.count({
        name,
        activityName,
        categoryId
      });
      const list = await this.service.list({ name, activityName, categoryId }, page, limit);
      return res.header('X-Total-count', count.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(req: IGetRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { id } = req.params;
      const model = await this.service.get(id);
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(req: IStoreRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const dto = new PackageDTO().parseFromBody(req.body).withImageUrl(req.file?.url);
      await new PackageUseCase(dto).create();

      return res.status(StatusCodes.CREATED).json();
    } catch (error) {
      next(error);
    }
  }

  async update(req: IUpdateRequest, res: Response, next: NextFunction): Promise<Response> {
    try {
      const dto = new PackageDTO().parseFromBody(req.body).withImageUrl(req.file?.url);
      await new PackageUseCase(dto).update();

      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.destroy(Number(id));
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export default new PackageController(packageService);
