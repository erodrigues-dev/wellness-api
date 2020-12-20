import { Op, Transaction } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Functionality from '../database/models/Functionality';
import Profile from '../database/models/Profile';
import IProfile from '../models/entities/IProfile';
import IProfileService, { IFilter } from './interfaces/IProfileService';

export class ProfileService implements IProfileService {
  async list(
    filter: IFilter,
    page: number = 1,
    limit: number = 10
  ): Promise<IProfile[]> {
    const where = this.buildQuery(filter);

    const rows: Profile[] = await Profile.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: ['name']
    });

    return rows.map(row => row.toJSON() as IProfile);
  }

  count(filter: IFilter): Promise<number> {
    const where = this.buildQuery(filter);
    return Profile.count({ where });
  }

  async get(id: number): Promise<IProfile> {
    const model: Profile = await Profile.findByPk(id, {
      include: [Profile.associations.functionalities]
    });
    if (!model) throw new CustomError('Profile not found', 404);
    return model.toJSON() as IProfile;
  }

  async create(data: IProfile): Promise<IProfile> {
    const tx = await Profile.sequelize.transaction();
    try {
      const model: Profile = await Profile.create(data, {
        include: [Profile.associations.functionalities],
        transaction: tx
      });

      await tx.commit();

      return model.toJSON() as IProfile;
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }

  async update(data: IProfile): Promise<IProfile> {
    const { id } = data;
    const model: Profile = await Profile.findByPk(id);
    if (!model) throw new CustomError('Profile not found', 404);

    model.name = data.name;
    model.description = data.description;

    const transaction: Transaction = await Profile.sequelize.transaction();

    try {
      await model.save({ transaction });

      await Functionality.destroy({
        where: { profileId: id },
        transaction
      });

      await Promise.all(
        data.functionalities.map(item =>
          Functionality.create(
            {
              ...item,
              profileId: id
            },
            { transaction }
          )
        )
      );

      await transaction.commit();

      await model.reload({
        include: [Profile.associations.functionalities]
      });

      return model.toJSON() as IProfile;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private buildQuery(filter: IFilter) {
    const where = {};

    if (filter.name) where['name'] = { [Op.iLike]: `%${filter.name}%` };

    if (filter.description)
      where['description'] = { [Op.iLike]: `%${filter.description}%` };

    return where;
  }
}

export default new ProfileService();
