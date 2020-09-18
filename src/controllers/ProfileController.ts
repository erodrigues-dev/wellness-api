import { Response, NextFunction } from 'express';
import IProfileService from '../shared/services/interfaces/IProfileService';
import IProfileController, {
  IGetRequest,
  IIndexRequest,
  IStoreRequest,
  IUpdateRequest
} from './interfaces/IProfileController';

import profileServive from '../shared/services/ProfileService';
import IFunctionality from '../shared/models/IFunctionality';

export class ProfileController implements IProfileController {
  constructor(private service: IProfileService) {}

  async index(
    req: IIndexRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, description, page, limit } = req.query;
      const count = await this.service.count({ name, description });
      const list = await this.service.list({ name, description }, page, limit);
      return res.header('X-Total-Count', count.toString()).json(list);
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
      const { name, description, functionalities } = req.body;
      const model = await this.service.create({
        name,
        description,
        functionalities: functionalities as IFunctionality[]
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
      const { id, name, description, functionalities } = req.body;
      const model = await this.service.update({
        id,
        name,
        description,
        functionalities: functionalities as IFunctionality[]
      });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController(profileServive) as IProfileController;
