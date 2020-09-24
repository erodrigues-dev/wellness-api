import { Op, Transaction } from 'sequelize';

import IPackage, { IPackageWithActivity } from '../models/IPackage';
import IPackageService, { IFilter } from './interfaces/IPackageService';

import Package from '../database/models/Package';
import CustomError from '../custom-error/CustomError';

import { deleteFileFromUrl } from '../utils/google-cloud-storage';

export class PackageService implements IPackageService {
  async list(
    filter: IFilter,
    page: number = 1,
    limit: number = 10
  ): Promise<IPackage[]> {
    const [where, whereActivity] = this.buildQuery(filter);

    const rows: Package[] = await Package.findAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      include: [
        {
          association: Package.associations.activities,
          where: { ...whereActivity }
        }
      ],
      order: ['name']
    });

    return rows.map(this.serialize);
  }

  count(filter: IFilter): Promise<number> {
    const [where, whereActivity] = this.buildQuery(filter);
    return Package.count({
      where,
      include: [
        {
          association: Package.associations.activities,
          where: { ...whereActivity }
        }
      ]
    });
  }

  async get(id: number): Promise<IPackage> {
    const model: Package = await Package.findByPk(id, {
      include: [
        {
          association: Package.associations.activities
        }
      ]
    });
    if (!model) throw new CustomError('Package not found', 404);

    return this.serialize(model);
  }

  async create(data: IPackage): Promise<IPackage> {
    const { activities, ...dataModel } = data;
    const transaction: Transaction = await Package.sequelize.transaction();
    const model: Package = await Package.create(dataModel, { transaction });

    await Promise.all(
      activities.map(({ id, quantity }) =>
        model.addActivity(id, {
          through: { quantity },
          transaction
        })
      )
    );

    await transaction.commit();

    await model.reload({
      include: [
        {
          association: Package.associations.activities,
          through: { attributes: ['quantity'] }
        }
      ]
    });

    return this.serialize(model);
  }

  async update(data: IPackage): Promise<IPackage> {
    const model: Package = await Package.findByPk(data.id);
    if (!model) throw new CustomError('Package not found', 404);

    const transaction: Transaction = await Package.sequelize.transaction();

    model.name = data.name;
    model.description = data.description;
    model.price = data.price;
    model.expiration = data.expiration;
    model.showInApp = data.showInApp;
    model.showInWeb = data.showInWeb;

    if (data.imageUrl) {
      if (model.imageUrl) {
        const url = model.imageUrl;
        transaction.afterCommit(() => deleteFileFromUrl(url).catch(() => {}));
      }

      model.imageUrl = data.imageUrl;
    }

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

    await model.reload({
      include: [
        {
          association: Package.associations.activities,
          through: { attributes: ['quantity'] }
        }
      ]
    });
    return this.serialize(model);
  }

  private serialize(item: Package) {
    const {
      activities,
      price,
      ...restPackage
    } = item.toJSON() as IPackageWithActivity;
    return <IPackage>{
      ...restPackage,
      price: Number(price),
      activities: activities.map(({ PackageActivity, ...restActivity }) => ({
        ...restActivity,
        quantity: PackageActivity?.quantity
      }))
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

export default new PackageService();
