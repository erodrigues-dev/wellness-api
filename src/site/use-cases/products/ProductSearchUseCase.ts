import { QueryTypes } from 'sequelize';

import conn from '../../../shared/database/connection';
import Category from '../../../shared/database/models/Category';
import { List } from '../../models/List';
import { ProductListViewModel, ProductType } from './models';

export interface SearchData {
  term?: string;
  category_ids?: string[];
  page?: number;
  limit?: number;
  type?: ProductType;
}

export class ProductSearchUseCase {
  async search(data: SearchData): Promise<List<ProductListViewModel>> {
    const { page, limit, term = '', category_ids, type = '' } = data;
    const result = await conn.query<ProductListViewModel>(
      `
      SELECT p.id, p.title, p.image_url, p.price, p.type, c2."name" category FROM (
        SELECT id, "name" title, image_url, price, category_id, 'activity' "type" FROM activities
        UNION SELECT id, "name" title, image_url, price, category_id, 'package' "type" FROM packages
      ) p
      join categories c2  on p.category_id = c2.id
      WHERE
        (false = :filter_term or p.title ilike :term) and
        (false = :filter_category or c2.id in (:category_ids)) and
        (false = :filter_type or p.type = :type)
      ORDER BY p.title LIMIT :limit OFFSET :offset;
      `,
      {
        type: QueryTypes.SELECT,
        replacements: {
          limit: limit + 1,
          offset: (page - 1) * limit,
          filter_term: !!term,
          term: `%${term}%`,
          filter_category: !!category_ids,
          category_ids: category_ids || [-1],
          filter_type: !!type,
          type
        }
      }
    );

    return {
      hasNextPage: result.length > limit,
      rows: result.slice(0, limit)
    };
  }

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

  private async query(page = 1, limit = 10) {}
}
