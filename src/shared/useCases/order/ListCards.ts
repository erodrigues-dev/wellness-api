import Customer from '../../database/models/Customer';
import { squareCustomerService } from '../../services/square/index';

export class ListCards {
  constructor(private customerId: number) {}

  async list() {
    const { squareId } = await Customer.findByPk(this.customerId, {
      attributes: ['squareId']
    });

    if (!squareId) return [];

    return squareCustomerService.listCards(squareId);
  }
}
