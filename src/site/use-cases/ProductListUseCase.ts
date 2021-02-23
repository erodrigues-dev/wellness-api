import conn from '../../shared/database/connection';
import { QueryTypes } from 'sequelize';

export type ProductType = 'activity' | 'package';
export interface ProductListViewModel {
  id: number;
  title: string;
  category: string;
  image_url: string;
  price: number;
  type: ProductType;
}

export interface List<T> {
  hasNextPage: boolean;
  rows: T[];
}

export class ProductListUseCase {
  async list(page = 1, limit = 10): Promise<List<ProductListViewModel>> {
    const result = await conn.query<ProductListViewModel>(
      `
        SELECT products.* FROM (
          SELECT id, "name" title, image_url, price, 'activity' "type" FROM activities
          UNION SELECT id, "name" title, image_url, price, 'package' "type" FROM packages
        ) products
        ORDER BY products.title LIMIT :limit OFFSET :offset
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
      rows: result.slice(0, limit)
    };
  }
}
