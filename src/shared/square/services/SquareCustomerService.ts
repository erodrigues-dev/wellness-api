import { AxiosInstance } from 'axios';

import { SquareCard } from '../models/SquareCard';
import { SquareCustomer } from '../models/SquareCustomer';

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

  async createOrUpdate(customer: SquareCustomer): Promise<SquareCustomer> {
    if (customer.id) return this.update(customer);
    return this.create(customer);
  }

  async create(createCustomer: SquareCustomer): Promise<SquareCustomer> {
    const {
      data: { customer }
    } = await this.api.post('/customers', createCustomer);

    return new SquareCustomer(customer);
  }

  async update(updateData: SquareCustomer): Promise<SquareCustomer> {
    const {
      data: { customer }
    } = await this.api.put(`/customers/${updateData.id}`, updateData);

    return new SquareCustomer(customer);
  }

  async createCard(customerId: string, cardId: string, cardName: string) {
    const {
      data: { card }
    } = await this.api.post(`/customers/${customerId}/cards`, {
      card_nonce: cardId,
      cardholder_name: cardName
    });

    return new SquareCard(card);
  }

  async listCards(customerId: string): Promise<SquareCard[]> {
    const { data } = await this.api.get(`/customers/${customerId}`);
    return data?.customer?.cards?.map((card: any) => new SquareCard(card)) || [];
  }
}
