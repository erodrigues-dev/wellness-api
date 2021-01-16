import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ProfileFilterDto } from '../../shared/models/dto/ProfileFilterDto';
import service from '../../shared/services/ProfileService';

export class ProfileController {
  async index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, description, page, limit } = req.query;
      const filter = new ProfileFilterDto();
      filter.name = name as string;
      filter.description = description as string;
      const count = await service.count(filter);
      const list = await service.list(filter, page, limit);
      return res.header('X-Total-Count', count.toString()).json(list);
    } catch (error) {
      next(error);
    }
  }

  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const model = await service.get(Number(id));
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async store(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { name, description, permissions } = req.body;
      await service.create({
        name,
        description,
        permissions
      });
      return res.sendStatus(StatusCodes.CREATED);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id, name, description, permissions } = req.body;
      await service.update({
        id,
        name,
        description,
        permissions
      });
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();
