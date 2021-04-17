import { ICloudFile } from '../../../utils/interfaces/ICloudFile';

export class UpdateEmployeeModel {
  id: number;
  name: string;
  phone: string;
  specialtyId: number;
  imageUrl?: string;
  profileId: number;

  parse(obj: any): UpdateEmployeeModel {
    this.id = obj.id;
    this.name = obj.name;
    this.phone = obj.phone;
    this.specialtyId = obj.specialtyId;
    this.imageUrl = obj.imageUrl;
    this.profileId = obj.profileId;

    return this;
  }

  withImageUrl(obj: ICloudFile): UpdateEmployeeModel {
    this.imageUrl = obj?.url;
    return this;
  }
}
