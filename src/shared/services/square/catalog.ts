import { AxiosInstance } from 'axios';
import { v4 as uuid } from 'uuid';

import { RecurrencyPayEnum } from '../../models/enums/RecurrencyPayEnum';

export class SquareCatalogService {
  constructor(private api: AxiosInstance) {}

  async createOrUpdate() {
    const catalog: Catalog = {
      idempotency_key: uuid(),
      object: {
        id: '',
        type: 'ITEM'
      }
    };
    await this.api.post('/catalog/object');
  }
}

interface Catalog {
  idempotency_key: string;
  object: {
    id: string;
    type: 'ITEM' | 'SUBSCRIPTION_PLAN';
    item_data?: {
      name: string;
    };
    subscription_plan_data?: {
      name: string;
      phases: {
        cadence: 'WEEKLY' | 'MONTHLY';
        recurring_price_money: {
          amount: number;
          currency: 'USD';
        };
      }[];
    };
  };
}

export class CatalogBuilder {
  private catalog: any = {};

  withName(name: string) {
    if (!this.catalog.type)
      if (this.catalog.type === 'ITEM') this.catalog.item_data.name = name;
    if (this.catalog.type === 'SUBSCRIPTION_PLAN')
      this.catalog.subscription_plan_data.name = name;

    return this;
  }

  withRecurrencyType(type: RecurrencyPayEnum) {
    if (type === RecurrencyPayEnum.oneTime) {
      this.catalog.type = 'ITEM';
      this.catalog.item_data = {};
    }
  }
}
