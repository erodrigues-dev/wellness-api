import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import CustomerDb from '../database/models/Customer';
import { Customer, CustomerCreateModel, CustomerUpdateModel } from '../models/entities/Customer';
import { CustomerListViewModel } from '../models/viewmodels/CustomerListViewModel';
import { CustomerViewModel } from '../models/viewmodels/CustomerViewModel';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import { hash } from '../utils/hash-password';

export class CustomerService {
  async list(filter: any, page = null, limit = null): Promise<CustomerListViewModel[]> {
    const where = this.buildQuery(filter);

    const findOptions: FindOptions = {
      where,
      attributes: { exclude: ['password'] },
      order: ['name']
    };

    if (!!page && !!limit) {
      findOptions.limit = limit;
      findOptions.offset = (page - 1) * limit;
    }

    const customers = await CustomerDb.findAll(findOptions);
    return CustomerListViewModel.mapCollection(customers);
  }

  count(filter: any): Promise<number> {
    const where = this.buildQuery(filter);
    return CustomerDb.count({ where });
  }

  async get(id: number): Promise<CustomerViewModel> {
    const customer = await CustomerDb.findByPk(id, {
      attributes: {
        exclude: ['password']
      }
    });

    if (!customer) throw new CustomError('Customer not found', 404);

    return CustomerViewModel.map(customer);
  }

  async create(data: CustomerCreateModel): Promise<Customer> {
    data.password = await hash(data.password);

    const emailExist = await this.checkEmail(data.email);
    if (emailExist) throw new CustomError('Email is in use', 400);

    const customerDb = await CustomerDb.create(data);
    return Customer.map(customerDb.toJSON());
  }

  async delete(id: number): Promise<void> {
    const count = await CustomerDb.destroy({
      where: { id }
    });

    if (count === 0) throw new CustomError('Customer not found', 404);
  }

  async updateSquareId(id: number, squareId: string): Promise<void> {
    await CustomerDb.update(
      { squareId },
      {
        where: { id }
      }
    );
  }

  async update(data: CustomerUpdateModel): Promise<Customer> {
    const customer = await CustomerDb.findByPk(data.id);
    if (!customer) throw new CustomError('customer not found', 404);

    customer.name = data.name;
    customer.phone = data.phone;
    customer.privateNotes = data.privateNotes;

    if (data.imageUrl) {
      // delete old image
      if (customer.imageUrl) await deleteFileFromUrl(customer.imageUrl).catch(() => {});

      customer.imageUrl = data.imageUrl;
    }

    await customer.save();
    return Customer.map(customer.toJSON());
  }

  private buildQuery(filter: any) {
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

  async checkEmail(email: string, id: number = null): Promise<boolean> {
    const andsParameters: any[] = [{ email }];

    if (id) andsParameters.push({ id: { [Op.ne]: id } });

    const matchs = await CustomerDb.count({
      where: { [Op.and]: andsParameters }
    });

    return matchs > 0;
  }
}

export default new CustomerService();
