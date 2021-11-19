export class LoginViewModel {
  id: number;
  name: string;
  email: string;
  specialty: {
    id: number;
    name: string;
  };
  imageUrl: string;
  permissions: number;

  static parse(obj: any) {
    const viewModel = new LoginViewModel();

    viewModel.id = obj.id;
    viewModel.name = obj.name;
    viewModel.email = obj.email;
    viewModel.specialty = obj.specialty;
    viewModel.imageUrl = obj.imageUrl;
    viewModel.permissions = obj.profile.permissions;

    return viewModel;
  }
}
