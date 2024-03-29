import { Request, Response, NextFunction } from 'express';

import { Op } from 'sequelize';
import Customer from '../../shared/database/models/Customer';
import TeamGroup from '../../shared/database/models/TeamGroup';
import Employee from '../../shared/database/models/Employee';
import Specialty from '../../shared/database/models/Specialty';
import Activity from '../../shared/database/models/Activity';

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

  async employees(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, specialties } = req.query as any;

      let nameQuery = {};
      let specialtiesQuery = {};

      if (q) {
        nameQuery = { where: { name: { [Op.iLike]: `%${q}%` } } };
      }

      if (specialties) {
        const names = Array.isArray(specialties) ? specialties : [specialties];

        specialtiesQuery = {
          include: {
            association: 'specialties',
            attributes: ['name'],
            where: {
              name: { [Op.in]: names }
            }
          }
        };
      }

      const list = await Employee.findAll({
        ...specialtiesQuery,
        ...nameQuery,
        attributes: ['id', 'name'],
        order: ['name'],
        limit: LIMIT
      });

      const parsed = list.map(item => ({
        id: item.id,
        name: item.name
      }));

      return res.json(parsed);
    } catch (error) {
      next(error);
    }
  }

  async specialties(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query as any;

      const list = await Specialty.findAll({
        where: {
          name: { [Op.iLike]: `%${q}%` }
        },
        attributes: ['id', 'name'],
        order: ['name'],
        limit: LIMIT
      });

      return res.json(list);
    } catch (error) {
      next(error);
    }
  }

  async activities(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;

      const list = await Activity.findAll({
        where: {
          name: { [Op.iLike]: `%${q}%` }
        },
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
