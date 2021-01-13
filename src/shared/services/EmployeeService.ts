import { Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Employee from '../database/models/Employee';
import IEmployee from '../models/entities/IEmployee';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import { hash } from '../utils/hash-password';
import IEmployeeService, { IFilter } from './interfaces/IEmployeeService';

export class EmployeeService implements IEmployeeService {
  async list(filter: IFilter, page = 1, limit = 10): Promise<IEmployee[]> {
    const where = this.buildQuery(filter);
    const whereProfile = filter.profile
      ? { name: { [Op.iLike]: `%${filter.profile}%` } }
      : {};
    const list = await Employee.findAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      attributes: { exclude: ['password', 'profileId'] },
      include: [
        {
          association: Employee.associations.profile,
          attributes: ['id', 'name'],
          where: { ...whereProfile }
        }
      ],
      order: ['name']
    });

    return list.map(item => item.toJSON() as IEmployee);
  }

  count(filter: IFilter): Promise<number> {
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

  async create(data: IEmployee): Promise<IEmployee> {
    data.password = await hash(data.password);
    const model: Employee = await Employee.create(data);

    return model.toJSON() as IEmployee;
  }

  async update(data: IEmployee): Promise<IEmployee> {
    const model: Employee = await Employee.findByPk(data.id);
    if (!model) throw new CustomError('Employee not found', 404);

    if (model.email !== data.email) {
      const emailExist = await this.checkEmail(data.id, data.email);
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

  private buildQuery(filter: IFilter) {
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

  private async checkEmail(id: number, email: string): Promise<boolean> {
    const matchs = await Employee.count({
      where: {
        id: { [Op.ne]: id },
        email: email
      }
    });

    return matchs > 0;
  }
}

export default new EmployeeService();
