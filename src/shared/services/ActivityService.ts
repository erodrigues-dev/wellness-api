import { Op } from 'sequelize';

import Activity from '../database/models/Activity';

import IActivity from '../models/IActivity';
import IActivityService, {
  IActivityFilter
} from './interfaces/IActivityService';

import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import CustomError from '../custom-error/CustomError';

export class ActivityService implements IActivityService {
  async list(
    filter: IActivityFilter,
    page = 1,
    limit = 10
  ): Promise<IActivity[]> {
    const where = this.buildQuery(filter);
    return await Activity.findAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      order: ['name'],
      include: [
        {
          association: Activity.associations.employee,
          attributes: ['id', 'name', 'email', 'imageUrl']
        }
      ]
    });
  }

  count(filter: IActivityFilter): Promise<number> {
    const where = this.buildQuery(filter);
    return Activity.count({ where });
  }

  async get(id: number): Promise<IActivity> {
    const query: Activity = await Activity.findByPk(id, {
      include: [
        {
          association: Activity.associations.employee,
          attributes: ['id', 'name', 'email', 'imageUrl']
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
    model.employeeId = data.employeeId;

    if (data.imageUrl) {
      if (model.imageUrl) await deleteFileFromUrl(model.imageUrl);
      model.imageUrl = data.imageUrl;
    }

    await model.save();
    return model.toJSON() as IActivity;
  }

  private buildQuery(filter: IActivityFilter) {
    const where = {
      name: { [Op.iLike]: `%${filter.name}%` },
      employeeId: filter.employeeId
    };

    if (!filter.name) {
      delete where.name;
    }

    if (!filter.employeeId) {
      delete where.employeeId;
    }

    return where;
  }
}

export default new ActivityService();
