import bitwise from 'bitwise-operator';

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
      item.hasPermission = bitwise.and(item.id, Number(accessLevel)) === item.id;
      return item;
    });
  }
}

export class Permission {
  static readonly ScheduleList: PermissionItem = {
    id: 1,
    group: 'Appointments',
    name: 'List Appointments'
  };

  static readonly ScheduleBook: PermissionItem = {
    id: 2,
    group: 'Appointments',
    name: 'Book new appointments'
  };

  static readonly ScheduleCancel: PermissionItem = {
    id: 2 ** 2,
    group: 'Appointments',
    name: 'Cancel appointments'
  };

  static readonly CustomerList: PermissionItem = {
    id: 2 ** 3,
    group: 'Customer',
    name: 'List customers'
  };

  static readonly CustomerCreateUpdate: PermissionItem = {
    id: 2 ** 4,
    group: 'Customer',
    name: 'Create/Update customers'
  };

  static readonly CustomerDelete: PermissionItem = {
    id: 2 ** 21,
    group: 'Customer',
    name: 'Delete customers'
  };

  static readonly OrderList: PermissionItem = {
    id: 2 ** 5,
    group: 'Orders',
    name: 'List orders'
  };

  static readonly OrderCheckout: PermissionItem = {
    id: 2 ** 6,
    group: 'Orders',
    name: 'Checkout orders'
  };

  static readonly OrderCancel: PermissionItem = {
    id: 2 ** 7,
    group: 'Orders',
    name: 'Cancel orders'
  };

  static readonly ActivityList: PermissionItem = {
    id: 2 ** 8,
    group: 'Activities',
    name: 'List activities'
  };

  static readonly ActivityCreateUpdate: PermissionItem = {
    id: 2 ** 9,
    group: 'Activities',
    name: 'Create/Update activities'
  };

  static readonly ActivityEvent: PermissionItem = {
    id: 2 ** 10,
    group: 'Activities',
    name: 'Create/Update event times'
  };

  static readonly PackageList: PermissionItem = {
    id: 2 ** 11,
    group: 'Packages',
    name: 'List packages'
  };

  static readonly PackageCreateUpdate: PermissionItem = {
    id: 2 ** 12,
    group: 'Packages',
    name: 'Create/Update packages'
  };

  // - settings

  static readonly EmployeeList: PermissionItem = {
    id: 2 ** 13,
    group: 'Settings',
    subgroup: 'Employees',
    name: 'List employees'
  };

  static readonly EmployeeCreateUpdate: PermissionItem = {
    id: 2 ** 14,
    group: 'Settings',
    subgroup: 'Employees',
    name: 'Create/Update employees'
  };

  static readonly EmployeeDelete: PermissionItem = {
    id: 2 ** 22,
    group: 'Settings',
    subgroup: 'Employees',
    name: 'Delete employees'
  };

  static readonly ProfileList: PermissionItem = {
    id: 2 ** 15,
    group: 'Settings',
    subgroup: 'Profiles',
    name: 'List profiles'
  };

  static readonly ProfileCreateUpdate: PermissionItem = {
    id: 2 ** 16,
    group: 'Settings',
    subgroup: 'Profiles',
    name: 'Create/Update profiles'
  };

  static readonly CategoryList: PermissionItem = {
    id: 2 ** 17,
    group: 'Settings',
    subgroup: 'Categories',
    name: 'List categories'
  };

  static readonly CategoryCreateUpdate: PermissionItem = {
    id: 2 ** 18,
    group: 'Settings',
    subgroup: 'Categories',
    name: 'Create/Update categories'
  };

  static readonly DiscountList: PermissionItem = {
    id: 2 ** 19,
    group: 'Settings',
    subgroup: 'Discount',
    name: 'List discounts'
  };

  static readonly DiscountCreateUpdate: PermissionItem = {
    id: 2 ** 20,
    group: 'Settings',
    subgroup: 'Discount',
    name: 'Create/Update discounts'
  };

  static readonly SpecialtyList: PermissionItem = {
    id: 2 ** 23,
    group: 'Settings',
    subgroup: 'Specialty',
    name: 'List specialties'
  };

  static readonly SpecialtyCreateUpdate: PermissionItem = {
    id: 2 ** 24,
    group: 'Settings',
    subgroup: 'Specialty',
    name: 'Create/Update specialties'
  };

  static readonly SpecialtyDelete: PermissionItem = {
    id: 2 ** 25,
    group: 'Settings',
    subgroup: 'Specialty',
    name: 'Delete specialties'
  };

  static readonly WaiverList: PermissionItem = {
    id: 2 ** 26,
    group: 'Settings',
    subgroup: 'Waiver',
    name: 'List waivers'
  };

  static readonly WaiverCreateUpdate: PermissionItem = {
    id: 2 ** 27,
    group: 'Settings',
    subgroup: 'Waiver',
    name: 'Create/Update waivers'
  };

  static readonly WaiverDelete: PermissionItem = {
    id: 2 ** 28,
    group: 'Settings',
    subgroup: 'Waiver',
    name: 'Delete waivers'
  };

  static readonly WorkoutProfileList: PermissionItem = {
    id: 2 ** 29,
    group: 'Workout',
    name: 'List workout profiles'
  };

  static readonly WorkoutProfileCreateUpdate: PermissionItem = {
    id: 2 ** 30,
    group: 'Workout',
    name: 'Create/Update workout profiles'
  };

  static readonly WorkoutProfileDelete: PermissionItem = {
    id: 2 ** 31,
    group: 'Workout',
    name: 'Delete workout profiles'
  };

  static readonly NotificationList: PermissionItem = {
    id: 2 ** 32,
    group: 'Notification',
    name: 'List notifications'
  };

  static readonly NotificationCreateUpdate: PermissionItem = {
    id: 2 ** 33,
    group: 'Notification',
    name: 'Create/Update notifications'
  };

  static readonly NotificationDelete: PermissionItem = {
    id: 2 ** 34,
    group: 'Notification',
    name: 'Delete notifications'
  };
}
