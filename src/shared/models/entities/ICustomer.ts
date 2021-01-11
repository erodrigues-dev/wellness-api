export default interface ICustomer {
  id?: number;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  squareId: string;

  createdAt?: Date;
  updatedAt?: Date;
}
