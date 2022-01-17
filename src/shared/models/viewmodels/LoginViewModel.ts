export class LoginViewModel {
  id: number;
  name: string;
  email: string;
  specialties: {
    id: number;
    name: string;
  }[];
  imageUrl: string;
  permissions: number;

  static parse(obj: any) {
    const viewModel = new LoginViewModel();

    viewModel.id = obj.id;
    viewModel.name = obj.name;
    viewModel.email = obj.email;
    viewModel.imageUrl = obj.imageUrl;
    viewModel.permissions = obj.profile.permissions;
    viewModel.specialties = this.mapSpecialties(obj.specialties);

    return viewModel;
  }

  static mapSpecialties(specialties) {
    return specialties?.map(item => ({ id: item.id, name: item.name })) || [];
  }
}
