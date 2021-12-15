import { Request, Response, NextFunction } from 'express';

import { Op } from 'sequelize';
import Customer from '../../shared/database/models/Customer';
import TeamGroup from '../../shared/database/models/TeamGroup';

const LIMIT = 20;

export class AutoCompleteControlller {
  async customers(req: Request, res: Response, next: NextFunction) {
    try {
      const { q = '' } = req.query as any;
      const list = await Customer.findAll({
        where: { name: { [Op.iLike]: `%${q}%` } },
        attributes: ['id', 'name'],
        order: ['name'],
        limit: LIMIT
      });

      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async teamGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const { q = '' } = req.query as any;
      const list = await TeamGroup.findAll({
        where: { name: { [Op.iLike]: `%${q}%` } },
        attributes: ['id', 'name'],
        order: ['name'],
        limit: LIMIT
      });

      return res.json(list);
    } catch (error) {
      next(error);
    }
  }
}

export const makeAutoCompleteController = () => new AutoCompleteControlller();
