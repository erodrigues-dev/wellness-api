import Category from '../../../shared/database/models/Category';
import { ProductType } from './models';

export class ProductSearchUseCase {
  async search() {}

  async listCategories(type: ProductType) {
    const list = await Category.findAll({
      where: {
        type
      }
    });

    return list.map(item => ({
      id: item.id,
      name: item.name
    }));
  }
}
