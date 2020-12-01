import { PackageTypeEnum } from '../enums/PackageTypeEnum';
import { RecurrencyPayEnum } from '../enums/RecurrencyPayEnum';

export class PackageDTO {
  id?: number;
  name: string;
  price: number;
  description: string;
  expiration?: Date;
  showInApp: boolean;
  showInWeb: boolean;
  categoryId: number;
  recurrencyPay: RecurrencyPayEnum;
  type: PackageTypeEnum;
  total?: number;
  imageUrl: string;
  activities: {
    id: number;
    quantity: number;
  }[];

  parseFromBody(body: any) {
    this.id = Number(body.id);
    this.name = body.name;
    this.price = Number(body.price);
    this.description = body.description;
    if (body.expiration) this.expiration = new Date(body.expiration);
    this.showInApp = Boolean(body.showInApp);
    this.showInWeb = Boolean(body.showInWeb);
    this.categoryId = Number(body.categoryId);
    this.recurrencyPay = body.recurrencyPay;
    this.type = body.type;
    if (body.total) this.total = Number(body.total);
    this.activities = body.activities;

    return this;
  }

  withImageUrl(url: string) {
    this.imageUrl = url;

    return this;
  }
}
