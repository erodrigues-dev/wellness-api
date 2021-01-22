import { FindOptions, Op, Transaction } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Profile from '../database/models/Profile';
import { ProfileDto } from '../models/dto/ProfileDto';
import { ProfileFilterDto } from '../models/dto/ProfileFilterDto';
import {
  ProfileListViewModel,
  ProfileViewModel
} from '../models/viewmodels/ProfileViewModel';

export class ProfileService {
  async list(
    filter: ProfileFilterDto,
    page: number = null,
    limit: number = null
  ): Promise<ProfileListViewModel[]> {
    const where = this.buildQuery(filter);

    const findOptions: FindOptions = {
      where,
      order: ['name']
    };

    if (!!page && !!limit) {
      findOptions.limit = limit;
      findOptions.offset = (page - 1) * limit;
    }

    const rows: Profile[] = await Profile.findAll(findOptions);

    return rows.map(row => ProfileListViewModel.parse(row.toJSON()));
  }

  count(filter: ProfileFilterDto): Promise<number> {
    const where = this.buildQuery(filter);
    return Profile.count({ where });
  }

  async get(id: number): Promise<ProfileViewModel> {
    const model = await Profile.findByPk(id);
    if (!model) throw new CustomError('Profile not found', 404);

    return ProfileViewModel.parse(model.toJSON());
  }

  async create(profile: ProfileDto): Promise<void> {
    await Profile.create(profile);
  }

  async update(profile: ProfileDto): Promise<void> {
    const { id } = profile;
    const model: Profile = await Profile.findByPk(id);
    if (!model) throw new CustomError('Profile not found', 404);
    model.name = profile.name;
    model.description = profile.description;
    model.permissions = profile.permissions;
    await model.save();
  }

  private buildQuery(filter: ProfileFilterDto) {
    const where = {};

    if (filter.name) where['name'] = { [Op.iLike]: `%${filter.name}%` };

    if (filter.description)
      where['description'] = { [Op.iLike]: `%${filter.description}%` };

    return where;
  }
}

export default new ProfileService();
