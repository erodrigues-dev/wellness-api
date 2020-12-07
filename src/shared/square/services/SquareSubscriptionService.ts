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
}
