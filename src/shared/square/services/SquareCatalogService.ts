import { AxiosInstance } from 'axios';

import { SquareCatalog } from '../models/SquareCatalog';
import { SquareCatalogUpsertRequest } from '../models/SquareCatalogRequest';

export class SquareCatalogService {
  constructor(private api: AxiosInstance) {}

  async get(id: string) {
    const { data } = await this.api.get(`/catalog/object/${id}`);

    return data.object as SquareCatalog;
  }

  async upsert(catalog: SquareCatalogUpsertRequest) {
    const { data } = await this.api.post('/catalog/object', catalog);

    return data.catalog_object;
  }
}
