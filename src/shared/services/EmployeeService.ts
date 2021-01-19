import { FindOptions, Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Employee from '../database/models/Employee';
import IEmployee from '../models/entities/IEmployee';
import { EmployeeViewModel } from '../models/viewmodels/EmployeeViewModel';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import { hash } from '../utils/hash-password';

type Filter = {
  name: string;
  email: string;
  specialty: string;
  profile: string;
};

export class EmployeeService {
  async list(
    filter: Filter,
    page: number = null,
    limit: number = null
  ): Promise<EmployeeViewModel[]> {
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

    return EmployeeViewModel.map(query.toJSON() as Employee);
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
}

export default new EmployeeService();
