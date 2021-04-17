export class CreateCustomerModel {
  name: string;
  email: string;
  imageUrl: string;
  privateNotes: string;
  publicNotes: string;
  phone: string;

  parse(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.imageUrl = data.imageUrl;
    this.privateNotes = data.privateNotes;
    this.publicNotes = data.publicNotes;
    this.phone = data.phone;

    return this;
  }

  withImageUrl(url: string) {
    this.imageUrl = url;

    return this;
  }
}
