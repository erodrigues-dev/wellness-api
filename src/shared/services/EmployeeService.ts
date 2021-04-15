import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Employee from '../database/models/Employee';
import { EmployeeViewModel } from '../models/viewmodels/EmployeeViewModel';

type Filter = {
  name: string;
  email: string;
  specialty: string;
  profile: string;
};

export class EmployeeService {
  async list(filter: Filter, page: number = null, limit: number = null): Promise<EmployeeViewModel[]> {
    const where = this.buildQuery(filter);

    const findOptions: FindOptions = {
      where,
      include: [
        {
          association: Employee.associations.profile,
          attributes: ['id', 'name']
        }
      ],
      order: ['name']
    };

    if (!!page && !!limit) {
      findOptions.limit = limit;
      findOptions.offset = (page - 1) * limit;
    }

    const list = await Employee.findAll(findOptions);

    return EmployeeViewModel.mapCollection(list);
  }

  count(filter: Filter): Promise<number> {
    const where = this.buildQuery(filter);

    return Employee.count({
      where,
      include: [
        {
          association: Employee.associations.profile
        }
      ]
    });
  }

  async get(id: number): Promise<EmployeeViewModel> {
    const query: Employee = await Employee.findByPk(id, {
      include: [
        {
          association: Employee.associations.profile,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!query) throw new CustomError('Emplyee not found', 404);

    return EmployeeViewModel.map(query.toJSON() as Employee);
  }

  private buildQuery(filter: Filter) {
    const where: any[] = [];

    if (filter.name) {
      where.push({ name: { [Op.iLike]: `%${filter.name}%` } });
    }

    if (filter.email) {
      where.push({ email: { [Op.iLike]: `%${filter.email}%` } });
    }

    if (filter.specialty) {
      where.push({ specialty: { [Op.iLike]: `%${filter.specialty}%` } });
    }

    if (filter.profile) {
      where.push({
        ['$profile.name$']: { [Op.iLike]: `%${filter.profile}%` }
      });
    }

    return {
      [Op.and]: where
    };
  }

  async checkEmail(email: string, id: number = null): Promise<boolean> {
    const queryParams: any[] = [{ email }];
    if (id) queryParams.push({ id });

    const matchs = await Employee.count({
      where: { [Op.and]: queryParams }
    });

    return matchs > 0;
  }

  async checkDeletedEmail(email: string) {
    const matchs = await Employee.count({
      where: { email, deletedAt: { [Op.not]: null } },
      paranoid: false
    });

    return matchs > 0;
  }

  async destroy(id: number) {
    const count = await Employee.destroy({
      where: { id }
    });

    if (count === 0) throw new CustomError('Employee not found', 404);
  }
}

export default new EmployeeService();
