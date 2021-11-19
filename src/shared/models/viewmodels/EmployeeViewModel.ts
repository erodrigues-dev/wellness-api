import Employee from '../../database/models/Employee';

type Profile = {
  id: number;
  name: string;
};

export class EmployeeViewModel {
  id: number;
  name: string;
  email: string;
  specialty: {
    id: number;
    name: string;
  };
  imageUrl?: string;
  profile: Profile;
  phone: string;
  createdAt: Date;

  static map(employee: Employee): EmployeeViewModel {
    const viewModel = new EmployeeViewModel();

    viewModel.id = employee.id;
    viewModel.name = employee.name;
    viewModel.email = employee.email;
    viewModel.specialty = employee.specialty;
    viewModel.phone = employee.phone;
    viewModel.imageUrl = employee.imageUrl;
    viewModel.createdAt = employee.createdAt;

    viewModel.profile = {
      id: employee.profileId,
      name: employee.profile?.name
    };

    return viewModel;
  }

  static mapCollection(list: Employee[]): EmployeeViewModel[] {
    return list.map(EmployeeViewModel.map);
  }
}
