export class UpdateCustomerModel {
  id: number;
  name: string;
  imageUrl: string;
  phone: string;
  privateNotes: string;

  parse(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.imageUrl = data.imageUrl;
    this.privateNotes = data.privateNotes;

    return this;
  }

  withImageUrl(url: string) {
    this.imageUrl = url;

    return this;
  }
}
