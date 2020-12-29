type PermissionType = {
  name: string;
  group?: string;
  subgroup?: string;
  permission: number;
};

export class Permission {
  static readonly ActivityList: PermissionType = {
    name: 'List Activities',
    permission: 1 << 0
  };

  static readonly ActivityCreateUpdate: PermissionType = {
    name: 'Create/Update activity',
    permission: 1 << 1
  };

  static readonly PackageList: PermissionType = {
    name: 'List packages',
    permission: 1 << 2
  };

  static readonly PackageCreateUpdate: PermissionType = {
    name: 'Create/Update package',
    permission: 1 << 3
  };

  static readonly CategoryList: PermissionType = {
    name: 'List Categories',
    group: 'Settings',
    permission: 1 << 10
  };

  static readonly CategoryCreateUpdate: PermissionType = {
    name: 'Create/Update Categories',
    group: 'Settings',
    permission: 1 << 11
  };
}
