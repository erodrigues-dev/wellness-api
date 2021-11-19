import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Activity from '../database/models/Activity';
import ActivityEmployee from '../database/models/ActivityEmployee';
import { getPaginateOptions } from '../utils/getPaginateOptions';
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
  employees: number[];
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
      include: [
        this.buildEmployeeInclude(filter.employeeId, ['id', 'name', 'email', 'imageUrl']),
        {
          association: 'category',
          attributes: ['id', 'name']
        },
        {
          association: 'waiver',
          attributes: ['id', 'title']
        }
      ],
      where,
      order: ['name'],
      ...getPaginateOptions(page, limit)
    };

    const list = await Activity.findAll(findOptions);
    return list.map(this.parseActivity);
  }

  count(filter: FilterData): Promise<number> {
    const where = this.buildQuery(filter);
    return Activity.count({
      include: this.buildEmployeeInclude(filter.employeeId),
      where,
      distinct: true
    });
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

  async create({ employees, ...data }: CreateData) {
    const transaction = await Activity.sequelize.transaction();

    try {
      const model = await Activity.create(data, { transaction });

      if (employees.length > 0) {
        await ActivityEmployee.bulkCreate(
          employees.map(employeeId => ({
            employeeId,
            activityId: model.id
          })),
          { transaction }
        );
      }

      await transaction.commit();
      return model.toJSON();
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async update(data: UpdateData) {
    const model = await Activity.findByPk(data.id);
    if (!model) throw new CustomError('Activity not found', 404);

    const transaction = await Activity.sequelize.transaction();

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
      const oldImageUrl = model.imageUrl;
      model.imageUrl = data.imageUrl;
      if (oldImageUrl) {
        transaction.afterCommit(async () => {
          await deleteFileFromUrl(oldImageUrl).catch(() => {});
        });
      }
    }

    try {
      await ActivityEmployee.destroy({ where: { activityId: data.id }, transaction });
      if (data.employees.length > 0) {
        await ActivityEmployee.bulkCreate(
          data.employees.map(employeeId => ({
            employeeId,
            activityId: data.id
          })),
          { transaction }
        );
      }
      await model.save({ transaction });
      await transaction.commit();
      return model.toJSON();
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  private buildQuery(filter: FilterData) {
    const where = {
      name: { [Op.iLike]: `%${filter.name}%` },
      categoryId: filter.categoryId
    };

    if (!filter.name) {
      delete where.name;
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

  private buildEmployeeInclude(id = null, attributes = []) {
    return {
      association: 'employees',
      attributes,
      where: id ? { id } : {},
      required: Boolean(id)
    };
  }
}

export default new ActivityService();
