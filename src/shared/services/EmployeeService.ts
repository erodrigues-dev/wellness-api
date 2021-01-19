import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Employee from '../database/models/Employee';
import IEmployee from '../models/entities/IEmployee';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import { hash } from '../utils/hash-password';

export class EmployeeService {
  async list(
    filter: any,
    page: number = null,
    limit: number = null
  ): Promise<IEmployee[]> {
    const where = this.buildQuery(filter);
    const whereProfile = filter.profile
      ? { name: { [Op.iLike]: `%${filter.profile}%` } }
      : {};

    const findOptions: FindOptions = {
      where,
      attributes: { exclude: ['password', 'profileId'] },
      include: [
        {
          association: Employee.associations.profile,
          attributes: ['id', 'name'],
          where: { ...whereProfile }
        }
      ],
      order: ['name']
    };

    if (!!page && !!limit) {
      findOptions.limit = limit;
      findOptions.offset = (page - 1) * limit;
    }

    const list = await Employee.findAll(findOptions);

    return list.map(item => item.toJSON() as IEmployee);
  }

  count(filter: any): Promise<number> {
    const where = this.buildQuery(filter);
    const whereProfile = filter.profile
      ? { name: { [Op.iLike]: `%${filter.profile}%` } }
      : {};
    return Employee.count({
      where,
      include: [
        {
          association: Employee.associations.profile,
          where: { ...whereProfile }
        }
      ]
    });
  }

  async get(id: number): Promise<IEmployee> {
    const query: Employee = await Employee.findByPk(id, {
      attributes: {
        exclude: ['password', 'profileId']
      },
      include: [
        {
          association: Employee.associations.profile,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!query) throw new CustomError('Emplyee not found', 404);

    return query.toJSON() as IEmployee;
  }

  async update(data: IEmployee): Promise<IEmployee> {
    const model: Employee = await Employee.findByPk(data.id);
    if (!model) throw new CustomError('Employee not found', 404);

    if (model.email !== data.email) {
      const emailExist = await this.checkEmail(data.email, data.id);
      if (emailExist) throw new CustomError('Email in use', 400);
    }

    model.name = data.name;
    model.email = data.email;
    model.specialty = data.specialty;
    model.profileId = data.profileId;
    if (data.password) model.password = await hash(data.password);

    if (data.imageUrl) {
      if (model.imageUrl) await deleteFileFromUrl(model.imageUrl);

      model.imageUrl = data.imageUrl;
    }

    await model.save();
    return model.toJSON() as IEmployee;
  }

  private buildQuery(filter: any) {
    const where = {
      name: { [Op.iLike]: `%${filter.name}%` },
      email: { [Op.iLike]: `%${filter.email}%` },
      specialty: { [Op.iLike]: `%${filter.specialty}%` }
    };

    if (!filter.name) {
      delete where.name;
    }

    if (!filter.email) {
      delete where.email;
    }

    if (!filter.specialty) {
      delete where.specialty;
    }

    return where;
  }

  async checkEmail(email: string, id: number = null): Promise<boolean> {
    const queryParams: any[] = [{ email }];
    if (id) queryParams.push({ id });

    const matchs = await Employee.count({
      where: { [Op.and]: queryParams }
    });

    return matchs > 0;
  }
}

export default new EmployeeService();
