import { Request, Response, NextFunction } from 'express';

import { Op } from 'sequelize';
import Customer from '../../shared/database/models/Customer';

export class AutoCompleteControlller {
  async customers(req: Request, res: Response, next: NextFunction) {
    try {
      const { q = '' } = req.query as any;

      const list = await Customer.findAll({
        where: {
          name: { [Op.iLike]: `%${q}%` }
        },
        attributes: ['id', 'name'],
        order: ['name'],
        limit: 20
      });

      return res.json(list);
    } catch (error) {
      next(error);
    }
  }
}

export const makeAutoCompleteController = () => new AutoCompleteControlller();
