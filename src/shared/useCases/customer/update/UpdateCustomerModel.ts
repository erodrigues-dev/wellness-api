export class UpdateCustomerModel {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  privateNotes: string;

  parse(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.imageUrl = data.imageUrl;
    this.privateNotes = data.privateNotes;

    return this;
  }

  withImageUrl(url: string) {
    this.imageUrl = url;

    return this;
  }
}
