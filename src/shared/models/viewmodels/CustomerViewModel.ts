import { Customer } from '../entities/Customer';

export class CustomerViewModel {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  privateNotes: string;
  publicNotes: string;
  phone: string;
  createdAt: Date;

  static map(entity: Customer): CustomerViewModel {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      imageUrl: entity.imageUrl,
      privateNotes: entity.privateNotes,
      publicNotes: entity.publicNotes,
      createdAt: entity.createdAt
    };
  }

  static mapCollection(entities: Customer[]): CustomerViewModel[] {
    return entities.map(CustomerViewModel.map);
  }
}
