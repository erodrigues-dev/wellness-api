export class CustomerDTO {
  id?: number;
  name: string;
  email: string;
  password: string;
  imageUrl: string;

  parseFromBody(body: any) {
    this.id = body.id;
    this.name = body.name;
    this.email = body.email;
    this.password = body.password;
    this.imageUrl = body.imageUrl;

    return this;
  }

  withImageUrl(url: string) {
    this.imageUrl = url;

    return this;
  }
}
