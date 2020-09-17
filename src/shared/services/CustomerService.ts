import { Op } from 'sequelize';

import Customer from '../database/models/Customer';

import ICustomer from '../models/ICustomer';
import ICustomerService, {
  ICustomerFilter
} from './interfaces/ICustomerService';

import { hash } from '../utils/hash-password';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import CustomError from '../custom-error/CustomError';

export class CustomerService implements ICustomerService {
  async list(
    filter: ICustomerFilter,
    page = 1,
    limit = 10
  ): Promise<ICustomer[]> {
    const where = this.buildQuery(filter);
    return await Customer.findAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      attributes: { exclude: ['password'] },
      order: ['name']
    });
  }

  count(filter: ICustomerFilter): Promise<number> {
    const where = this.buildQuery(filter);
    return Customer.count({ where });
  }

  async get(id: number): Promise<ICustomer> {
    const query: Customer = await Customer.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    });

    if (!query) return null;

    return query.toJSON() as ICustomer;
  }

  async create(data: ICustomer): Promise<ICustomer> {
    data.password = await hash(data.password);
    const model: Customer = await Customer.create(data);

    return model.toJSON() as ICustomer;
  }

  async update(data: ICustomer): Promise<ICustomer> {
    const customer: Customer = await Customer.findByPk(data.id);
    if (!customer) throw new CustomError('customer not found', 404);

    if (customer.email !== data.email) {
      const emailExist = await this.checkEmail(data.id, data.email);
      if (emailExist) throw new CustomError('email in use', 404);
    }

    customer.name = data.name;
    customer.email = data.email;

    // hash new password
    if (data.password) customer.password = await hash(data.password);

    if (data.imageUrl) {
      // delete old image
      if (customer.imageUrl) await deleteFileFromUrl(customer.imageUrl);

      customer.imageUrl = data.imageUrl;
    }

    await customer.save();
    return customer.toJSON() as ICustomer;
  }

  private buildQuery(filter: ICustomerFilter) {
    const where = {
      name: { [Op.iLike]: `%${filter.name}%` },
      email: { [Op.iLike]: `%${filter.email}%` }
    };

    if (!filter.name) {
      delete where.name;
    }

    if (!filter.email) {
      delete where.email;
    }

    return where;
  }

  private async checkEmail(id: number, email: string): Promise<boolean> {
    const matchs = await Customer.count({
      where: {
        id: { [Op.ne]: id },
        email: email
      }
    });

    return matchs > 0;
  }
}

export default new CustomerService();
