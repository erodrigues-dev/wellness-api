import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import specialtyService, { SpecialtyService } from '../../shared/services/SpecialtyService';

export class SpecialtyController {
  constructor(private service: SpecialtyService) {}

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { count, rows } = await this.service.list({
        name: String(req.query.name || ''),
        page: Number(req.query.page || 1),
        limit: Number(req.query.limit || 10)
      });
      res.header('x-total-count', String(count));
      return res.json(rows);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await this.service.get(Number(req.params.id));
      if (item === null) return res.status(404).json({ message: 'Specialty not found' });
      return res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdItem = await this.service.create(req.body.name);
      return res.json(createdItem);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.udpate({
        id: Number(req.body.id),
        name: req.body.name
      });
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.destroy(Number(req.params.id));
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new SpecialtyController(specialtyService);
