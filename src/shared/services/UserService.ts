import { Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Employee from '../database/models/Employee';
import { EmployeeSelfUpdateDto } from '../models/dto/EmployeeSelfUpdateDto';
import { LoginViewModel } from '../models/viewmodels/LoginViewModel';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import { compare, hash } from '../utils/hash-password';

export class UserService {
  async login(email: string, password: string): Promise<LoginViewModel> {
    const user = await this.getUserWithProfileByEmail(email);
    if (!user) return null;

    const match = await compare(password, user.password);

    if (!match) throw new CustomError('Login or Password is not valid.', 401);

    return LoginViewModel.parse(user.toJSON());
  }

  async update(data: EmployeeSelfUpdateDto) {
    const model = await Employee.findByPk(data.id, {
      include: [
        {
          association: Employee.associations.profile
        }
      ]
    });
    if (!model) throw new CustomError('Employee not found', 404);

    if (model.email !== data.email) {
      const emailExist = await this.checkEmail(data.id, data.email);
      if (emailExist) throw new CustomError('Email in use', 400);
    }

    model.name = data.name;
    model.email = data.email;
    model.specialty = data.specialty;

    if (data.password) model.password = await hash(data.password);

    if (data.imageUrl) {
      if (model.imageUrl) await deleteFileFromUrl(model.imageUrl);

      model.imageUrl = data.imageUrl;
    }

    await model.save();

    return LoginViewModel.parse(model.toJSON());
  }

  private getUserWithProfileByEmail(email: string): Promise<Employee> {
    return Employee.findOne({
      where: { email },
      include: [
        {
          association: Employee.associations.profile
        }
      ]
    });
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

export default new UserService();
