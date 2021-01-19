import { ForeignKeyConstraintError } from 'sequelize';

import CustomError from '../../../custom-error/CustomError';
import Employee from '../../../database/models/Employee';
import { EmployeeViewModel } from '../../../models/viewmodels/EmployeeViewModel';
import { sendEmailSigup } from '../../../sendingblue';
import employeeService from '../../../services/EmployeeService';
import { generateTempPassword, hash } from '../../../utils/hash-password';
import { CreateEmployeeModel } from './CreateEmployeeModel';

export class CreateEmployeeUseCase {
  private employee: Employee;
  private tempPassword: string;
  constructor(private data: CreateEmployeeModel) {}
  async create(): Promise<EmployeeViewModel> {
    this.generateTempPassword();
    await this.checkEmail();
    await this.createOnDB();
    await this.sendEmail();

    return EmployeeViewModel.map(this.employee);
  }

  private generateTempPassword() {
    this.tempPassword = generateTempPassword();
  }

  private async checkEmail(): Promise<void> {
    const existEmail = await employeeService.checkEmail(this.data.email);
    if (existEmail) throw new CustomError('Email is in use');
  }

  private async createOnDB(): Promise<void> {
    try {
      this.employee = await Employee.create({
        name: this.data.name,
        email: this.data.email,
        phone: this.data.phone,
        specialty: this.data.specialty,
        imageUrl: this.data.imageUrl,
        profileId: this.data.profileId,
        password: await hash(this.tempPassword)
      });
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError)
        throw new CustomError('Profile id is invalid');

      throw error;
    }
  }

  private async sendEmail(): Promise<void> {
    await sendEmailSigup.send({
      name: this.data.name,
      email: this.data.email,
      tempPassword: this.tempPassword
    });
  }
}
