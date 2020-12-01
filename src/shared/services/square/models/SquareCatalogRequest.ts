import { v4 as uuidv4 } from 'uuid';

import CustomError from '../../../custom-error/CustomError';
import { RecurrencyPayEnum } from '../../../models/enums/RecurrencyPayEnum';
import {
    SquareCatalog, SquareCatalogSubscriptionPlan, SquareSusbscriptionPhase
} from './SquareCatalog';
import { SquareMoney } from './SquareMoney';

export class SquareCatalogUpsertRequest {
  idempotency_key: string;
  object: SquareCatalog;
}

export class SquareCatalogUpsertRequestBuilder {
  private key: string;
  private catalog: SquareCatalog;

  constructor(catalog?: SquareCatalog) {
    this.key = uuidv4();

    if (catalog) {
      const json = JSON.stringify(catalog);
      this.catalog = JSON.parse(json);
    } else {
      this.catalog = new SquareCatalog();
      this.catalog.type = 'SUBSCRIPTION_PLAN';
      this.catalog.subscription_plan_data = new SquareCatalogSubscriptionPlan();
      this.catalog.subscription_plan_data.phases = [
        new SquareSusbscriptionPhase()
      ];
    }
  }

  setName(name: string) {
    this.catalog.subscription_plan_data.name = name;
  }

  setPrice(price: number) {
    this.catalog.subscription_plan_data.phases[0].recurring_price_money = new SquareMoney(
      price
    );
  }

  setRecurrency(recurrencyPay: RecurrencyPayEnum) {
    if (recurrencyPay === RecurrencyPayEnum.oneTime)
      throw new CustomError('Invalid subscription plan cadence', 500);

    const recurrency = recurrencyPay.toUpperCase();
    const cadence = this.catalog.subscription_plan_data.phases[0].cadence;

    if (recurrency !== cadence) {
      this.catalog.id = '#create_new';
    }

    this.catalog.subscription_plan_data.phases[0].cadence = recurrency;
  }

  build() {
    return {
      idempotency_key: this.key,
      object: this.catalog
    } as SquareCatalogUpsertRequest;
  }
}
