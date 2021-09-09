import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Package from '../database/models/Package';
import IPackage, { IPackageWithIncludes } from '../models/entities/IPackage';
import IPackageService, { IFilter } from './interfaces/IPackageService';

export class PackageService implements IPackageService {
  async list(filter: IFilter, page: number = null, limit: number = null): Promise<IPackage[]> {
    const [where, whereActivity] = this.buildQuery(filter);

    const findOptions: FindOptions = {
      where,
      include: [
        {
          association: Package.associations.activities,
          where: { ...whereActivity }
        },
        {
          association: Package.associations.category,
          attributes: ['id', 'name']
        }
      ],
      order: ['name']
    };

    if (!!page && !!limit) {
      findOptions.limit = limit;
      findOptions.offset = (page - 1) * limit;
    }

    const rows: Package[] = await Package.findAll(findOptions);

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
        },
        {
          association: Package.associations.category,
          attributes: ['id', 'name']
        }
      ]
    });
    if (!model) throw new CustomError('Package not found', 404);

    return this.serialize(model);
  }

  async destroy(id: number): Promise<void> {
    await Package.destroy({
      where: { id }
    });
  }

  private serialize(item: Package) {
    const { activities, price, total, ...restPackage } = item.toJSON() as IPackageWithIncludes;
    return <IPackageWithIncludes>{
      ...restPackage,
      price: Number(price),
      total: Number(total) || null,
      activities: activities.map(({ PackageActivity, price, ...restActivity }) => ({
        ...restActivity,
        price: Number(price) || null,
        quantity: PackageActivity?.quantity
      }))
    };
  }

  private buildQuery(filter: IFilter) {
    const where = {};
    const whereActivity = {};

    if (filter.name) where['name'] = { [Op.iLike]: `%${filter.name}%` };

    if (filter.activityName) whereActivity['name'] = { [Op.iLike]: `%${filter.activityName}%` };

    if (filter.categoryId) where['categoryId'] = filter.categoryId;

    return [where, whereActivity];
  }
}

export default new PackageService();
