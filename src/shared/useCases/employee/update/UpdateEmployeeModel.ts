import { ICloudFile } from '../../../utils/interfaces/ICloudFile';

export class UpdateEmployeeModel {
  id: number;
  name: string;
  phone: string;
  specialties: number[];
  imageUrl?: string;
  profileId: number;

  parse(obj: any): UpdateEmployeeModel {
    this.id = obj.id;
    this.name = obj.name;
    this.phone = obj.phone;
    this.specialties = obj.specialties || [];
    this.imageUrl = obj.imageUrl;
    this.profileId = obj.profileId;

    return this;
  }

  withImageUrl(obj: ICloudFile): UpdateEmployeeModel {
    this.imageUrl = obj?.url;
    return this;
  }
}
