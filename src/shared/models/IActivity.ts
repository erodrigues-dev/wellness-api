export default interface IActivity {
  id?: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
  employeeId: number;

  quantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IActivityWithPackageActivity extends IActivity {
  PackageActivity?: {
    quantity: number;
  };
}

export interface IActivityWithCustomPackageActivity extends IActivity {
  CustomPackageActivity?: {
    quantity: number;
  };
}
