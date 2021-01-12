export type PermissionItem = {
  id: number;
  name: string;
  group?: string;
  subgroup?: string;
  hasPermission?: boolean;
};

export class PermissionHelper {
  static listAll(accessLevel: number): Permission[] {
    return Object.values(Permission).map(item => {
      item.hasPermission = (item.id & accessLevel) === item.id;
      return item;
    });
  }
}

export class Permission {
  static readonly ScheduleList: PermissionItem = {
    id: 1 << 0,
    group: 'Appointments',
    name: 'List Appointments'
  };

  static readonly ScheduleBook: PermissionItem = {
    id: 1 << 1,
    group: 'Appointments',
    name: 'Book new appointments'
  };

  static readonly ScheduleCancel: PermissionItem = {
    id: 1 << 2,
    group: 'Appointments',
    name: 'Cancel appointments'
  };

  static readonly CustomerList: PermissionItem = {
    id: 1 << 3,
    group: 'Customer',
    name: 'List customers'
  };

  static readonly CustomerCreateUpdate: PermissionItem = {
    id: 1 << 4,
    group: 'Customer',
    name: 'Create/Update customers'
  };

  static readonly OrderList: PermissionItem = {
    id: 1 << 5,
    group: 'Orders',
    name: 'List orders'
  };

  static readonly OrderCheckout: PermissionItem = {
    id: 1 << 6,
    group: 'Orders',
    name: 'Checkout orders'
  };

  static readonly OrderCancel: PermissionItem = {
    id: 1 << 7,
    group: 'Orders',
    name: 'Cancel orders'
  };

  static readonly ActivityList: PermissionItem = {
    id: 1 << 8,
    group: 'Activities',
    name: 'List activities'
  };

  static readonly ActivityCreateUpdate: PermissionItem = {
    id: 1 << 9,
    group: 'Activities',
    name: 'Create/Update activities'
  };

  static readonly ActivityEvent: PermissionItem = {
    id: 1 << 10,
    group: 'Activities',
    name: 'Create/Update event times'
  };

  static readonly PackageList: PermissionItem = {
    id: 1 << 11,
    group: 'Packages',
    name: 'List packages'
  };

  static readonly PackageCreateUpdate: PermissionItem = {
    id: 1 << 12,
    group: 'Packages',
    name: 'Create/Update packages'
  };

  // - settings

  static readonly EmployeeList: PermissionItem = {
    id: 1 << 13,
    group: 'Settings',
    subgroup: 'Employees',
    name: 'List employees'
  };

  static readonly EmployeeCreateUpdate: PermissionItem = {
    id: 1 << 14,
    group: 'Settings',
    subgroup: 'Employees',
    name: 'Create/Update employees'
  };

  static readonly ProfileList: PermissionItem = {
    id: 1 << 15,
    group: 'Settings',
    subgroup: 'Profiles',
    name: 'List profiles'
  };

  static readonly ProfileCreateUpdate: PermissionItem = {
    id: 1 << 16,
    group: 'Settings',
    subgroup: 'Profiles',
    name: 'Create/Update profiles'
  };

  static readonly CategoryList: PermissionItem = {
    id: 1 << 17,
    group: 'Settings',
    subgroup: 'Categories',
    name: 'List categories'
  };

  static readonly CategoryCreateUpdate: PermissionItem = {
    id: 1 << 18,
    group: 'Settings',
    subgroup: 'Categories',
    name: 'Create/Update categories'
  };

  static readonly DiscountList: PermissionItem = {
    id: 1 << 19,
    group: 'Settings',
    subgroup: 'Discount',
    name: 'List discounts'
  };

  static readonly DiscountCreateUpdate: PermissionItem = {
    id: 1 << 20,
    group: 'Settings',
    subgroup: 'Discount',
    name: 'Create/Update discounts'
  };
}
