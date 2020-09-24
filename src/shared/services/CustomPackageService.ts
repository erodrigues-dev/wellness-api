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
  private db = CustomPackage;

  async list(
    filter: IFilter,
    page: number = 1,
    limit: number = 10
  ): Promise<ICustomPackage[]> {
    const [where, whereActivity] = this.buildQuery(filter);

    const rows: CustomPackage[] = await this.db.findAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      include: [
        {
          association: CustomPackage.associations.activities,
          attributes: ['id', 'name'],
          where: { ...whereActivity }
        }
      ],
      order: ['name']
    });

    return rows.map(this.serialize);
  }

  count(filter: IFilter): Promise<number> {
    const [where, whereActivity] = this.buildQuery(filter);
    return this.db.count({
      where,
      include: [
        {
          association: CustomPackage.associations.activities,
          where: { ...whereActivity }
        }
      ]
    });
  }

  async get(customerId: number, id: number): Promise<ICustomPackage> {
    const model: CustomPackage = await this.db.findByPk(id, {
      include: [
        {
          association: this.db.associations.activities,
          attributes: ['id', 'name', 'price', 'duration']
        },
        {
          association: this.db.associations.customer,
          attributes: ['id', 'name', 'imageUrl']
        }
      ]
    });
    if (!model || model.customerId !== customerId)
      throw new CustomError('Package not found', 404);

    return this.serialize(model);
  }

  async create(data: ICustomPackageWithActivity): Promise<number> {
    const { activities, ...dataModel } = data;
    const transaction: Transaction = await this.db.sequelize.transaction();
    const model: CustomPackage = await this.db.create(dataModel, {
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
    const model: CustomPackage = await this.db.findByPk(data.id);
    if (!model || model.customerId !== data.customerId)
      throw new CustomError('Package not found', 404);

    const transaction: Transaction = await this.db.sequelize.transaction();

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

  async destroy(customerId: number, id: number): Promise<void> {
    const rows = this.db.destroy({
      where: {
        customerId,
        id
      }
    });

    if (rows === 0) throw new CustomError('Package not found', 404);
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
    const where = {
      customerId: filter.customerId
    };
    const whereActivity = {};

    if (filter.name) where['name'] = { [Op.iLike]: `%${filter.name}%` };

    if (filter.activityName)
      whereActivity['name'] = { [Op.iLike]: `%${filter.activityName}%` };

    return [where, whereActivity];
  }
}

export default new CustomPackageService();
