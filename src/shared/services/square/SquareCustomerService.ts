import { AxiosInstance } from 'axios';

import { SquareCustomer } from './models/SquareCustomer';

export class SquareCustomerService {
  constructor(private api: AxiosInstance) {}

  async getByEmail(email: string) {
    const {
      data: { customers: [firstCustomer] = [] }
    } = await this.api.post('/customers/search', {
      query: {
        filter: {
          email_address: {
            exact: email
          }
        }
      }
    });

    return new SquareCustomer(firstCustomer);
  }

  async getById(id: string): Promise<SquareCustomer> {
    const {
      data: { customer }
    } = await this.api.get(`/customers/${id}`);
    return new SquareCustomer(customer);
  }

  async create(createCustomer: SquareCustomer): Promise<string> {
    const {
      data: {
        customer: { id }
      }
    } = await this.api.post('/customers', createCustomer);

    return id;
  }
}
