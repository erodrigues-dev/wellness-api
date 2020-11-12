import { AxiosInstance } from 'axios';

import { SquarePayment } from './models/SquarePayment';
import { SquarePaymentCreateData } from './models/SquarePaymentCreateData';

export class SquarePaymentService {
  constructor(private api: AxiosInstance) {}

  async create(paymentData: SquarePaymentCreateData) {
    const {
      data: { payment }
    } = await this.api.post('/payments', paymentData);
    return new SquarePayment(payment);
  }
}
