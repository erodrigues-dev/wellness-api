import Order from '../database/models/Order';
import IOrderService from './interfaces/IOrderService';

export class OrderService implements IOrderService {
  list(): Promise<Order[]> {
    return Order.findAll();
  }
}

export default new OrderService();
