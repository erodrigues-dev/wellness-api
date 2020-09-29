import { Op } from 'sequelize';
import IUserService, { IUpdateData } from './interfaces/IUserService';

import Employee from '../database/models/Employee';
import Profile from '../database/models/Profile';

import { compare, hash } from '../utils/hash-password';
import ILoginResponse from './interfaces/ILoginResponse';
import CustomError from '../custom-error/CustomError';
import { deleteFileFromUrl } from '../utils/google-cloud-storage';

export class UserService implements IUserService {
  async login(email: string, password: string) {
    const user = await this.getUserWithProfileBy(email);
    if (!user) return null;

    const match = await compare(password, user.password);
    if (!match) return null;

    return this.transformInLoginResponse(user);
  }

  async update(data: IUpdateData) {
    const model: Employee = await Employee.findByPk(data.id, {
      include: [
        {
          association: Employee.associations.profile,
          include: [Profile.associations.functionalities]
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

    return this.transformInLoginResponse(model);
  }

  private getUserWithProfileBy(email: string): Promise<Employee> {
    return Employee.findOne({
      where: { email },
      include: [
        {
          association: Employee.associations.profile,
          include: [Profile.associations.functionalities]
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

  transformInLoginResponse(model: Employee) {
    const payload = <ILoginResponse>{
      id: model.id,
      name: model.name,
      email: model.email,
      imageUrl: model.imageUrl,
      profile: {}
    };

    if (model.profile) {
      const { id, name, functionalities: list } = model.profile;
      const functionalities = list.map(item => ({
        name: item.name,
        actions: item.actions
      }));

      payload.profile = {
        id,
        name,
        functionalities
      };
    }

    return payload;
  }
}

export default new UserService();
