import { ForeignKeyConstraintError } from 'sequelize';

import CustomError from '../../../custom-error/CustomError';
import Employee from '../../../database/models/Employee';
import { EmployeeViewModel } from '../../../models/viewmodels/EmployeeViewModel';
import { sendEmailSignUp } from '../../../sendingblue';
import employeeService from '../../../services/EmployeeService';
import { deleteFileFromUrl } from '../../../utils/google-cloud-storage';
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

    const existDeletedEmail = await employeeService.checkDeletedEmail(this.data.email);
    if (existDeletedEmail)
      throw new CustomError('Email is in use by a disable account, contact an administrator for more info');
  }

  private async createOnDB(): Promise<void> {
    const transaction = await Employee.sequelize.transaction();
    try {
      this.employee = await Employee.create(
        {
          name: this.data.name,
          email: this.data.email,
          phone: this.data.phone,
          imageUrl: this.data.imageUrl,
          profileId: this.data.profileId,
          password: await hash(this.tempPassword)
        },
        { transaction }
      );

      await this.employee.setSpecialties(this.data.specialties, { transaction });
      await transaction.commit();
    } catch (error) {
      console.error('Error on CreateEmployeeUseCase:createOnDB', error);
      await transaction.rollback();
      await deleteFileFromUrl(this.data.imageUrl);
      if (error instanceof ForeignKeyConstraintError) this.catchForeignKeyConstraintError(error);

      throw error;
    }
  }

  private catchForeignKeyConstraintError(error) {
    if (error.message.includes('specialties')) throw new CustomError('The specialty informed is invalid');

    if (error.message.includes('profile')) throw new CustomError('The profile informed is invalid');
  }

  private async sendEmail(): Promise<void> {
    await sendEmailSignUp.send({
      name: this.data.name,
      email: this.data.email,
      tempPassword: this.tempPassword
    });
  }
}
