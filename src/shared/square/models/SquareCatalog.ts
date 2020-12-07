import { SquareMoney } from './SquareMoney';

export class SquareCatalog {
  id: string;
  type: string;
  updated_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  subscription_plan_data: SquareCatalogSubscriptionPlan;
}

export class SquareCatalogSubscriptionPlan {
  name: string;
  phases: SquareSusbscriptionPhase[];
}

export class SquareSusbscriptionPhase {
  uid: string;
  cadence: string;
  recurring_price_money: SquareMoney;
  ordinal: number;
}
