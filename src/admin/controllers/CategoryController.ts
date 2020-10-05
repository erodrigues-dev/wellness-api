import { Response, NextFunction } from 'express';

import ICategoryService from '../../shared/services/interfaces/ICategoryService';
import ICategoryController, {
  IGetRequest,
  IIndexRequest,
  IStoreRequest,
  IUpdateRequest
} from './interfaces/ICategoryController';

import categoryService from '../../shared/services/CategoryService';

export class CategoryController implements ICategoryController {
  constructor(private service: ICategoryService) {}

  async index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, type, page, limit } = req.query;
      const total = await this.service.count(name, type);
      const list = await this.service.list(name, type, page, limit);
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
      const { name, type } = req.body;
      const model = await this.service.create({
        name,
        type
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
      const { id, name } = req.body;
      const model = await this.service.update({
        id,
        name,
        type: null //dont updated
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

const controller: ICategoryController = new CategoryController(categoryService);

export default controller;
