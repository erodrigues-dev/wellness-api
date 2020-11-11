export default interface IOrder {
  id?: number;
  customerId: number;
  subtotal: number;
  tip: number;
  discount: number;
  total: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
