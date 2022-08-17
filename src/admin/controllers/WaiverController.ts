import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import waiverService, { WaiverService } from '../../shared/services/WaiverService';

const schemas = {
  create: Joi.object({
    title: Joi.string().max(120).required(),
    text: Joi.string().required()
  }),
  update: Joi.object({
    id: Joi.number(),
    title: Joi.string().max(120).required(),
    text: Joi.string().required()
  })
};

export class WaiverController {
  constructor(private service: WaiverService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const paginate = await this.service.list({
        page: Number(req.query.page || 1),
        limit: Number(req.query.limit || 10),
        title: String(req.query.title || '')
      });
      return res.header('x-total-count', String(paginate.count)).json(paginate.rows);
    } catch (error) {
      next(error);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { ignoreOfCustomerId } = req.query;
      const result = await this.service.listAll({
        ignoreOfCustomerId: Number(ignoreOfCustomerId) || null
      });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const model = await this.service.get(Number(req.params.id));
      if (!model) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Waiver not found' });
      return res.json(model);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await schemas.create.validateAsync(req.body);
      const model = await this.service.create(req.body);
      return res.status(StatusCodes.CREATED).json(model);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await schemas.update.validateAsync(req.body);
      await this.service.update(req.body);
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteds = await this.service.destroy(Number(req.params.id));
      if (deleteds === 0) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Waiver not found' });
      return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
}

export default new WaiverController(waiverService);
