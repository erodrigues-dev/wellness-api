import { Op, Transaction } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Package from '../database/models/Package';
import { PackageDTO } from '../models/dto/PackageDTO';
import IPackage, { IPackageWithIncludes } from '../models/entities/IPackage';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import IPackageService, { IFilter } from './interfaces/IPackageService';

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
        },
        {
          association: Package.associations.category,
          attributes: ['id', 'name']
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

  private serialize(item: Package) {
    const {
      activities,
      price,
      total,
      ...restPackage
    } = item.toJSON() as IPackageWithIncludes;
    return <IPackageWithIncludes>{
      ...restPackage,
      price: Number(price),
      total: Number(total) || null,
      activities: activities.map(
        ({ PackageActivity, price, ...restActivity }) => ({
          ...restActivity,
          price: Number(price) || null,
          quantity: PackageActivity?.quantity
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

    if (filter.categoryId) where['categoryId'] = filter.categoryId;

    return [where, whereActivity];
  }
}

export default new PackageService();
