import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Employee from '../database/models/Employee';
import { EmployeeViewModel } from '../models/viewmodels/EmployeeViewModel';
import { getPaginateOptions } from '../utils/getPaginateOptions';

type Filter = {
  name: string;
  email: string;
  specialty: string;
  profile: string;
};

export class EmployeeService {
  async list(filter: Filter, page: number = null, limit: number = null): Promise<EmployeeViewModel[]> {
    const list = await Employee.findAll({
      ...this.buildQuery(filter),
      ...getPaginateOptions(page, limit)
    });

    return EmployeeViewModel.mapCollection(list);
  }

  count(filter: Filter): Promise<number> {
    return Employee.count({
      ...this.buildQuery(filter)
    });
  }

  async get(id: number): Promise<EmployeeViewModel> {
    const { include } = this.buildQuery({} as Filter);
    const query: Employee = await Employee.findByPk(id, { include });

    if (!query) throw new CustomError('Emplyee not found', 404);

    return EmployeeViewModel.map(query.toJSON() as Employee);
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

  private buildQuery(filter: Filter) {
    const criterias: any[] = [];
    const include = [
      {
        association: 'profile',
        attributes: ['id', 'name']
      },
      {
        association: 'specialties',
        attributes: ['id', 'name']
      }
    ];

    const order = ['name'];

    if (filter.name) {
      criterias.push({ name: { [Op.iLike]: `%${filter.name}%` } });
    }

    if (filter.email) {
      criterias.push({ email: { [Op.iLike]: `%${filter.email}%` } });
    }

    if (filter.specialty) {
      criterias.push({ ['$specialties.name$']: { [Op.iLike]: `%${filter.specialty}%` } });
    }

    if (filter.profile) {
      criterias.push({
        ['$profile.name$']: { [Op.iLike]: `%${filter.profile}%` }
      });
    }

    return {
      where: { [Op.and]: criterias },
      include,
      order
    };
  }
}

export default new EmployeeService();
