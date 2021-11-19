import { ForeignKeyConstraintError } from 'sequelize';

import CustomError from '../../../custom-error/CustomError';
import Employee from '../../../database/models/Employee';
import { EmployeeViewModel } from '../../../models/viewmodels/EmployeeViewModel';
import { deleteFileFromUrl } from '../../../utils/google-cloud-storage';
import { UpdateEmployeeModel } from './UpdateEmployeeModel';

export class UpdateEmployeeUseCase {
  private employee: Employee;
  constructor(private data: UpdateEmployeeModel) {}
  async update(): Promise<EmployeeViewModel> {
    await this.createOnDB();
    return EmployeeViewModel.map(this.employee);
  }

  private async createOnDB(): Promise<void> {
    try {
      const employee = await Employee.findByPk(this.data.id);
      if (!employee) throw new CustomError('Employee not found', 404);

      employee.name = this.data.name;
      employee.phone = this.data.phone;
      employee.specialtyId = this.data.specialtyId;
      employee.profileId = this.data.profileId;

      if (this.data.imageUrl) {
        if (employee.imageUrl) await deleteFileFromUrl(employee.imageUrl);
        employee.imageUrl = this.data.imageUrl;
      }

      await employee.save();
      this.employee = employee;
    } catch (error) {
      if (error instanceof ForeignKeyConstraintError) throw new CustomError('Profile id is invalid');

      throw error;
    }
  }
}
