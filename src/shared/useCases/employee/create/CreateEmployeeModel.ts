import { ICloudFile } from '../../../utils/interfaces/ICloudFile';

export class CreateEmployeeModel {
  name: string;
  email: string;
  phone: string;
  imageUrl?: string;
  profileId: number;
  specialties?: number[];

  parse(obj: any): CreateEmployeeModel {
    this.name = obj.name;
    this.email = obj.email;
    this.phone = obj.phone;
    this.imageUrl = obj.imageUrl;
    this.profileId = obj.profileId;
    this.specialties = obj.specialties || [];

    return this;
  }

  withImageUrl(obj: ICloudFile): CreateEmployeeModel {
    this.imageUrl = obj?.url;
    return this;
  }
}
