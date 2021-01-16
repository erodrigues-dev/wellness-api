import { Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Customer from '../database/models/Customer';
import ICustomer from '../models/entities/ICustomer';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import { hash } from '../utils/hash-password';
import ICustomerService, {
  ICustomerFilter
} from './interfaces/ICustomerService';

export class CustomerService implements ICustomerService {
  async list(
    filter: ICustomerFilter,
    page = 1,
    limit = null
  ): Promise<ICustomer[]> {
    const where = this.buildQuery(filter);

    const params: any = {
      where,
      attributes: { exclude: ['password'] },
      order: ['name']
    };

    if (limit !== null) {
      params.limit = limit;
      params.offset = (page - 1) * limit;
    }

    return await Customer.findAll(params);
  }

  count(filter: ICustomerFilter): Promise<number> {
    const where = this.buildQuery(filter);
    return Customer.count({ where });
  }

  async get(id: number): Promise<Customer> {
    const query: Customer = await Customer.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    });

    if (!query) return null;

    return query;
  }

  async create(data: ICustomer): Promise<Customer> {
    data.password = await hash(data.password);
    return Customer.create(data);
  }

  async update(data: ICustomer): Promise<Customer> {
    const customer: Customer = await Customer.findByPk(data.id);
    if (!customer) throw new CustomError('customer not found', 404);

    if (customer.email !== data.email) {
      const emailExist = await this.checkEmail(data.id, data.email);
      if (emailExist) throw new CustomError('Email in use', 400);
    }

    customer.name = data.name;
    customer.email = data.email;

    // hash new password
    if (data.password) customer.password = await hash(data.password);

    if (data.imageUrl) {
      // delete old image
      if (customer.imageUrl)
        await deleteFileFromUrl(customer.imageUrl).catch(() => {});

      customer.imageUrl = data.imageUrl;
    }

    await customer.save();
    return customer;
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
