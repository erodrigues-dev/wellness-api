import { QueryTypes } from 'sequelize';

import conn from '../../../shared/database/connection';
import { List } from '../../models/List';
import { ProductListViewModel } from './models';

export class ProductListUseCase {
  async list(page = 1, limit = 10): Promise<List<ProductListViewModel>> {
    const result = await conn.query<ProductListViewModel>(
      `
      SELECT p.id, p.title, p.image_url, p.price, p.type, c2."name" category FROM (
        SELECT id, "name" title, image_url, price, category_id, 'activity' "type" FROM activities
        UNION SELECT id, "name" title, image_url, price, category_id, 'package' "type" FROM packages
      ) p
      join categories c2  on p.category_id = c2.id
      ORDER BY p.title LIMIT :limit OFFSET :offset;
      `,
      {
        type: QueryTypes.SELECT,
        replacements: {
          limit: limit + 1,
          offset: (page - 1) * limit
        }
      }
    );

    return {
      hasNextPage: result.length > limit,
      rows: result
        .slice(0, limit)
        .map(item => ({ ...item, price: Number(item.price), image_url: item.image_url || null }))
    };
  }
}
