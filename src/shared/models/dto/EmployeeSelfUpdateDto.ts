export class EmployeeSelfUpdateDto {
  id?: number;
  name: string;
  email: string;
  confirmationCode: string;
  password: string;
  specialty: string;
  imageUrl?: string;
}
