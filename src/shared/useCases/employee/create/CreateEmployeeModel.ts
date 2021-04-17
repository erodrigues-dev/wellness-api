import { ICloudFile } from '../../../utils/interfaces/ICloudFile';

export class CreateEmployeeModel {
  name: string;
  email: string;
  phone: string;
  specialtyId?: number;
  imageUrl?: string;
  profileId: number;

  parse(obj: any): CreateEmployeeModel {
    this.name = obj.name;
    this.email = obj.email;
    this.phone = obj.phone;
    this.specialtyId = obj.specialtyId;
    this.imageUrl = obj.imageUrl;
    this.profileId = obj.profileId;

    return this;
  }

  withImageUrl(obj: ICloudFile): CreateEmployeeModel {
    this.imageUrl = obj?.url;
    return this;
  }
}
