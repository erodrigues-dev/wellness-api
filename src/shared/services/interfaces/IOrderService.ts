import PayWithMoneyDTO from '../../models/dto/PayWithMoneyDTO';

export default interface IOrderService {
  payWithMoney(dto: PayWithMoneyDTO): Promise<void>;
}
