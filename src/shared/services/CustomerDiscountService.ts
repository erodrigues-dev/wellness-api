import CustomError from '../custom-error/CustomError';
import CustomerDiscount from '../database/models/CustomerDiscount';
import ICustomerDiscountService, {
  IStore,
  IUpdate
} from './interfaces/ICustomerDiscountService';

export class CustomerDiscountService implements ICustomerDiscountService {
  private db = CustomerDiscount;

  async list(customerId?: number): Promise<CustomerDiscount[]> {
    const where = this.buildQuery(customerId);
    const list: CustomerDiscount[] = await this.db.findAll({
      where
    });

    return list;
  }

  async count(customerId?: number): Promise<number> {
    const where = this.buildQuery(customerId);
    const total = await this.db.count({ where });
    return total;
  }

  async store(data: IStore): Promise<CustomerDiscount> {
    const model = await this.db.create(data);

    return model;
  }

  async update(data: IUpdate): Promise<CustomerDiscount> {
    console.log(data);
    const model: CustomerDiscount = await this.db.findByPk(data.id);

    if (!model) throw new CustomError('Discount not found', 404);

    model.type = data.type;
    model.value = data.value;
    model.relationType = data.relationType;
    model.relationId = data.relationId;
    model.userId = data.userId;
    model.customerId = data.customerId;

    await model.save();

    return model;
  }

  async destroy(id: number, customerId?: number): Promise<void> {
    const deleteds = await this.db.destroy({
      where: { id, customerId: customerId ?? undefined }
    });

    if (deleteds === 0) throw new CustomError('Discount not found', 404);
  }

  private buildQuery(customerId: number) {
    const where = {};
    if (customerId) where['customerId'] = customerId;
    return where;
  }
}

export default new CustomerDiscountService();
