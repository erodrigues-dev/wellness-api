import Employee from '../../../database/models/Employee';
import { sendEmailRecoverPassword } from '../../../sendingblue';
import { generateTempPassword, hash } from '../../../utils/hash-password';

export class EmployeeRecoverPasswordUseCase {
  constructor(private email: string) {}

  async recover(): Promise<void> {
    const employee = await this.findEmployee();

    if (!employee) return;

    const tempPassword = generateTempPassword();

    await this.saveTempPassword(employee, tempPassword);

    await this.sendEmail(employee, tempPassword);
  }

  private async sendEmail(employee: Employee, tempPassword: string) {
    await sendEmailRecoverPassword.send({
      name: employee.name,
      email: employee.email,
      tempPassword
    });
  }

  private async saveTempPassword(employee: Employee, tempPassword: string) {
    employee.tempPassword = await hash(tempPassword);
    await employee.save();
  }

  private async findEmployee() {
    return await Employee.findOne({
      where: { email: this.email }
    });
  }
}
