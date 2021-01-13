import { AxiosInstance } from 'axios';

import { SquareSubscription } from '../models/SquareSubscription';
import { SquareSubscriptionCreateData } from '../models/SquareSubscriptionCreateData';

export class SquareSubscriptionService {
  constructor(private api: AxiosInstance) {}

  async create(
    createData: SquareSubscriptionCreateData
  ): Promise<SquareSubscription> {
    const { data } = await this.api.post('/subscriptions', createData);

    return data.subscription as SquareSubscription;
  }

  async get(id: string) {
    const { data } = await this.api.get(`/subscriptions/${id}`);
    return data.subscription as SquareSubscription;
  }

  async cancel(id: string): Promise<SquareSubscription> {
    const { data } = await this.api.post(`/subscriptions/${id}/cancel`);
    return data.subscription as SquareSubscription;
  }
}
