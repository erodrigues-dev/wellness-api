import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Activity from '../database/models/Activity';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';

interface FilterData {
  name?: string;
  employeeId?: number;
  categoryId?: number;
}

interface CreateData {
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  employeeId: number;
  categoryId: number;
  maxPeople: number;
  showInWeb: boolean;
  showInApp: boolean;
  waiverId: number;
}

interface UpdateData extends CreateData {
  id: number;
}

export class ActivityService {
  async list(filter: FilterData, page: number = null, limit: number = null): Promise<any[]> {
    const where = this.buildQuery(filter);

    const findOptions: FindOptions = {
      where,
      order: ['name'],
      include: [
        {
          association: 'employees',
          attributes: ['id', 'name', 'email', 'imageUrl']
        },
        {
          association: 'category',
          attributes: ['id', 'name']
        },
        {
          association: 'waiver',
          attributes: ['id', 'title']
        }
      ]
    };

    if (!!page && !!limit) {
      findOptions.limit = limit;
      findOptions.offset = (page - 1) * limit;
    }

    const list = await Activity.findAll(findOptions);
    return list.map(this.parseActivity);
  }

  count(filter: FilterData): Promise<number> {
    const where = this.buildQuery(filter);
    return Activity.count({ where });
  }

  async get(id: number) {
    const model = await Activity.findByPk(id, {
      include: [
        {
          association: 'employees',
          attributes: ['id', 'name', 'email', 'imageUrl']
        },
        {
          association: 'category',
          attributes: ['id', 'name']
        },
        {
          association: 'waiver',
          attributes: ['id', 'title']
        }
      ]
    });
    if (!model) throw new CustomError('Activity not found', 404);
    return this.parseActivity(model);
  }

  async create(data: CreateData) {
    const model = await Activity.create(data);
    return model.toJSON();
  }

  async update(data: UpdateData) {
    const model = await Activity.findByPk(data.id);
    if (!model) throw new CustomError('Activity not found', 404);

    model.name = data.name;
    model.description = data.description;
    model.price = data.price;
    model.duration = data.duration;
    model.categoryId = data.categoryId;
    model.showInApp = data.showInApp;
    model.showInWeb = data.showInWeb;
    model.maxPeople = data.maxPeople || null;
    model.waiverId = data.waiverId || null;

    if (data.imageUrl) {
      if (model.imageUrl) await deleteFileFromUrl(model.imageUrl);
      model.imageUrl = data.imageUrl;
    }

    await model.save();
    return model.toJSON();
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

  private parseActivity(model: Activity) {
    const item = model.toJSON() as any;

    item.employees = item.employees.map(employee => {
      delete employee.ActivityEmployee;
      return employee;
    });

    return item;
  }
}

export default new ActivityService();
