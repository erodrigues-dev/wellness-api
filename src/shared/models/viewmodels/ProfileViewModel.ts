import { Permission, PermissionHelper } from '../entities/Permission';

export class ProfileViewModel {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  permissions: Permission[];

  static parse(obj: any) {
    const viewModel = new ProfileViewModel();

    viewModel.id = obj.id;
    viewModel.name = obj.name;
    viewModel.description = obj.description;
    viewModel.createdAt = obj.createdAt;
    viewModel.permissions = PermissionHelper.listAll(obj.permissions);

    return viewModel;
  }
}

export class ProfileListViewModel {
  id: number;
  name: string;
  description: string;
  createdAt: Date;

  static parse(obj: any) {
    const viewModel = new ProfileListViewModel();

    viewModel.id = obj.id;
    viewModel.name = obj.name;
    viewModel.description = obj.description;
    viewModel.createdAt = obj.createdAt;

    return viewModel;
  }
}
