import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Category from '../database/models/Category';
import ICategory from '../models/entities/ICategory';
import ICategoryService from './interfaces/ICategoryService';

export class CategoryService implements ICategoryService {
  private db = Category;

  list(name: string, type: string, page: number = null, limit: number = null): Promise<ICategory[]> {
    const where = this.buildQuery(name, type);

    const findOptions: FindOptions = {
      where,
      order: ['name']
    };

    if (!!page && !!limit) {
      findOptions.limit = limit;
      findOptions.offset = (page - 1) * limit;
    }

    return this.db.findAll(findOptions);
  }

  count(name: string, type: string): Promise<number> {
    const where = this.buildQuery(name, type);
    return this.db.count({ where });
  }

  async get(id: number): Promise<ICategory> {
    const model: Category = await this.db.findByPk(id);
    if (!model) throw new CustomError('Category not found', 404);
    return model.toJSON() as ICategory;
  }

  async create(category: ICategory): Promise<ICategory> {
    const model: Category = await this.db.create(category);

    return model.toJSON() as ICategory;
  }

  async update(category: ICategory): Promise<void> {
    const model: Category = await this.db.findByPk(category.id);
    if (!model) throw new CustomError('Category not found', 404);

    model.name = category.name;

    await model.save();
  }

  private buildQuery(name: string, type: string) {
    const where = {};
    if (name) where['name'] = { [Op.iLike]: `%${name}%` };
    if (type) where['type'] = type;
    return where;
  }
}

export default new CategoryService();
