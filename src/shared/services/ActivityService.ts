import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Activity from '../database/models/Activity';
import IActivity from '../models/entities/IActivity';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';

interface FilterData {
  name?: string;
  employeeId?: number;
  categoryId?: number;
}

export class ActivityService {
  async list(filter: FilterData, page: number = null, limit: number = null): Promise<IActivity[]> {
    const where = this.buildQuery(filter);

    const findOptions: FindOptions = {
      where,
      order: ['name'],
      include: [
        {
          association: Activity.associations.employee,
          attributes: ['id', 'name', 'email', 'imageUrl']
        },
        {
          association: Activity.associations.category,
          attributes: ['id', 'name']
        }
      ]
    };

    if (!!page && !!limit) {
      findOptions.limit = limit;
      findOptions.offset = (page - 1) * limit;
    }

    return await Activity.findAll(findOptions);
  }

  count(filter: FilterData): Promise<number> {
    const where = this.buildQuery(filter);
    return Activity.count({ where });
  }

  async get(id: number): Promise<IActivity> {
    const query: Activity = await Activity.findByPk(id, {
      include: [
        {
          association: Activity.associations.employee,
          attributes: ['id', 'name', 'email', 'imageUrl']
        },
        {
          association: Activity.associations.category,
          attributes: ['id', 'name']
        }
      ]
    });
    if (!query) throw new CustomError('Activity not found', 404);
    return query.toJSON() as IActivity;
  }

  async create(data: IActivity): Promise<IActivity> {
    const model: Activity = await Activity.create(data);
    return model.toJSON() as IActivity;
  }

  async update(data: IActivity): Promise<IActivity> {
    const model: Activity = await Activity.findByPk(data.id);
    if (!model) throw new CustomError('Activity not found', 404);

    model.name = data.name;
    model.description = data.description;
    model.price = data.price;
    model.duration = data.duration;
    model.employeeId = data.employeeId || null;
    model.categoryId = data.categoryId;
    model.showInApp = data.showInApp;
    model.showInWeb = data.showInWeb;
    model.maxPeople = data.maxPeople || null;

    if (data.imageUrl) {
      if (model.imageUrl) await deleteFileFromUrl(model.imageUrl);
      model.imageUrl = data.imageUrl;
    }

    await model.save();
    return model.toJSON() as IActivity;
  }

  private buildQuery(filter: FilterData) {
    const where = {
      name: { [Op.iLike]: `%${filter.name}%` },
      employeeId: filter.employeeId,
      categoryId: filter.categoryId
    };

    if (!filter.name) {
      delete where.name;
    }

    if (!filter.employeeId) {
      delete where.employeeId;
    }

    if (!filter.categoryId) {
      delete where.categoryId;
    }

    return where;
  }
}

export default new ActivityService();
