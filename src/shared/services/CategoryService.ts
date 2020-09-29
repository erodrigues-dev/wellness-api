import { Op } from 'sequelize';
import CustomError from '../custom-error/CustomError';
import Category from '../database/models/Category';
import ICategory from '../models/ICategory';
import ICategoryService from './interfaces/ICategoryService';

export class CategoryService implements ICategoryService {
  private db = Category;

  list(
    name: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ICategory[]> {
    const where = this.buildQuery(name);
    return this.db.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: ['name']
    });
  }

  count(name: string): Promise<number> {
    const where = this.buildQuery(name);
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
    if (!model) throw new CustomError('Category nto found', 404);

    model.name = category.name;

    await model.save();
  }

  private buildQuery(name: string) {
    const where = {};
    if (name) where['name'] = { [Op.iLike]: `%${name}%` };
    return where;
  }
}

export default new CategoryService();
