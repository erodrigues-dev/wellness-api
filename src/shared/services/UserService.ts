import { Op } from 'sequelize';

import CustomError from '../custom-error/CustomError';
import Employee from '../database/models/Employee';
import { EmployeeSelfUpdateDto } from '../models/dto/EmployeeSelfUpdateDto';
import { LoginViewModel } from '../models/viewmodels/LoginViewModel';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';
import { compare, hash } from '../utils/hash-password';
import emailConfirmationCodeService from './EmailConfirmationCodeService';

export class UserService {
  async login(email: string, password: string): Promise<LoginViewModel> {
    const user = await this.getUserWithProfileByEmail(email);
    if (!user) throw new CustomError('Login or Password is not valid', 401);

    const matchPassword = await compare(password, user.password);
    const matchTempPassword = await compare(password, user.tempPassword);

    if (!matchPassword && !matchTempPassword) {
      throw new CustomError('Login or Password is not valid.', 401);
    }

    return LoginViewModel.parse(user.toJSON());
  }

  async update(data: EmployeeSelfUpdateDto) {
    const model = await Employee.findByPk(data.id, {
      include: ['profile']
    });
    if (!model) throw new CustomError('Employee not found', 404);

    if (model.email !== data.email)
      await this.checkChangeEmail(data.id, data.email, data.confirmationCode);

    model.name = data.name;
    model.email = data.email;
    model.specialty = data.specialty;

    if (data.password) model.password = await hash(data.password);

    if (data.imageUrl) {
      if (model.imageUrl) await deleteFileFromUrl(model.imageUrl);

      model.imageUrl = data.imageUrl;
    }

    await model.save();

    await emailConfirmationCodeService.deleteByEmail(model.email);

    return LoginViewModel.parse(model.toJSON());
  }

  private async checkChangeEmail(userId: number, email: string, code: string) {
    const emailExist = await this.checkEmail(userId, email);
    if (emailExist) throw new CustomError('Email in use', 400);

    if (!code)
      throw new CustomError('Confirmation code is required to change email');

    const codeIsValid = await emailConfirmationCodeService.codeIsValid(
      email,
      code
    );
    if (!codeIsValid) throw new CustomError('Confirmation code is invalid');
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
