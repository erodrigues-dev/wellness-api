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
    const transaction = await Employee.sequelize.transaction();

    try {
      const employee = await Employee.findByPk(this.data.id);
      if (!employee) throw new CustomError('Employee not found', 404);

      employee.name = this.data.name;
      employee.phone = this.data.phone;
      employee.profileId = this.data.profileId;

      if (this.data.imageUrl) {
        const imageUrlToDelete = employee.imageUrl;

        if (imageUrlToDelete) {
          transaction.afterCommit(async () => {
            await deleteFileFromUrl(imageUrlToDelete);
          });
        }

        employee.imageUrl = this.data.imageUrl;
      }

      await employee.save({ transaction });
      await employee.setSpecialties(this.data.specialties, { transaction });
      await transaction.commit();

      this.employee = await employee.reload({ include: ['profile', 'specialties'] });
    } catch (error) {
      await transaction.rollback();
      if (error instanceof ForeignKeyConstraintError) {
        this.catchForeignKeyError(error);
      }

      throw error;
    }
  }

  private catchForeignKeyError(error) {
    if (error.message.includes('specialties')) throw new CustomError('The specialty informed is invalid');
    if (error.message.includes('profile')) throw new CustomError('The profile informed is invalid');
  }
}
