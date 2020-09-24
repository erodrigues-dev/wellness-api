import { Op, Transaction } from 'sequelize';

import ICustomPackage, {
  ICustomPackageWithActivity
} from '../models/ICustomPackage';
import ICustomPackageService, {
  IFilter
} from './interfaces/ICustomPackageService';

import CustomPackage from '../database/models/CustomPackage';
import CustomError from '../custom-error/CustomError';

export class CustomPackageService implements ICustomPackageService {
  async list(
    filter: IFilter,
    page: number = 1,
    limit: number = 10
  ): Promise<ICustomPackage[]> {
    const [where, whereActivity] = this.buildQuery(filter);

    const rows: CustomPackage[] = await CustomPackage.findAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      include: [
        {
          association: CustomPackage.associations.activities,
          where: { ...whereActivity }
        }
      ],
      order: ['name']
    });

    return rows.map(this.serialize);
  }

  count(filter: IFilter): Promise<number> {
    const [where, whereActivity] = this.buildQuery(filter);
    return CustomPackage.count({
      where,
      include: [
        {
          association: CustomPackage.associations.activities,
          where: { ...whereActivity }
        }
      ]
    });
  }

  async get(id: number): Promise<ICustomPackage> {
    const model: CustomPackage = await CustomPackage.findByPk(id, {
      include: [
        {
          association: CustomPackage.associations.activities
        }
      ]
    });
    if (!model) throw new CustomError('Package not found', 404);

    return this.serialize(model);
  }

  async create(data: ICustomPackageWithActivity): Promise<number> {
    const { activities, ...dataModel } = data;
    const transaction: Transaction = await CustomPackage.sequelize.transaction();
    const model: CustomPackage = await CustomPackage.create(dataModel, {
      transaction
    });

    await Promise.all(
      activities.map(({ id, quantity }) =>
        model.addActivity(id, {
          through: { quantity },
          transaction
        })
      )
    );

    await transaction.commit();

    return model.id;
  }

  async update(data: ICustomPackageWithActivity): Promise<number> {
    const model: CustomPackage = await CustomPackage.findByPk(data.id);
    if (!model) throw new CustomError('Package not found', 404);

    const transaction: Transaction = await CustomPackage.sequelize.transaction();

    model.name = data.name;
    model.description = data.description;
    model.price = data.price;
    model.expiration = data.expiration;

    await model.save({ transaction });
    await model.setActivities([], { transaction });

    await Promise.all(
      data.activities.map(({ id, quantity }) =>
        model.addActivity(id, {
          through: { quantity },
          transaction
        })
      )
    );

    await transaction.commit();

    return model.id;
  }

  private serialize(item: CustomPackage) {
    const {
      activities,
      price,
      ...restPackage
    } = item.toJSON() as ICustomPackageWithActivity;
    return <ICustomPackage>{
      ...restPackage,
      price: Number(price),
      activities: activities.map(
        ({ CustomPackageActivity, ...restActivity }) => ({
          ...restActivity,
          quantity: CustomPackageActivity?.quantity
        })
      )
    };
  }

  private buildQuery(filter: IFilter) {
    const where = {};
    const whereActivity = {};

    if (filter.name) where['name'] = { [Op.iLike]: `%${filter.name}%` };

    if (filter.activityName)
      whereActivity['name'] = { [Op.iLike]: `%${filter.activityName}%` };

    return [where, whereActivity];
  }
}

export default new CustomPackageService();
