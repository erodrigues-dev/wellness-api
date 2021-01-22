import { Customer } from '../entities/Customer';

export class CustomerListViewModel {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  phone: string;
  createdAt: Date;

  static map(entity: Customer): CustomerListViewModel {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      imageUrl: entity.imageUrl,
      createdAt: entity.createdAt
    };
  }

  static mapCollection(entities: Customer[]): CustomerListViewModel[] {
    return entities.map(CustomerListViewModel.map);
  }
}
