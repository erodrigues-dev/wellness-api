export default interface IPackage {
  id?: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  expiration: Date;
  showInApp: boolean;
  showInWeb: boolean;

  createdAt: Date;
  updatedAt: Date;
}
