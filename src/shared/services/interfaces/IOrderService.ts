import Order from '../../database/models/Order';

export default interface IOrderService {
  list(): Promise<Order[]>;
}
