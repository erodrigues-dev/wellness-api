export class Customer {
  id?: number;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  squareId?: string;
  privateNotes: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  static map(db: any): Customer {
    const entity = new Customer();

    entity.id = db.id;
    entity.name = db.name;
    entity.email = db.email;
    entity.password = db.password;
    entity.imageUrl = db.imageUrl;
    entity.squareId = db.squareId;
    entity.privateNotes = db.privateNotes;
    entity.phone = db.phone;
    entity.createdAt = db.createdAt;
    entity.updatedAt = db.updatedAt;

    return entity;
  }
}

export class CustomerCreateModel {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  privateNotes: string;
  phone: string;
}

export class CustomerUpdateModel {
  id: number;
  name: string;
  imageUrl: string;
  privateNotes: string;
  phone: string;
}
