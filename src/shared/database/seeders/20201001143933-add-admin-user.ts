import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('profiles', [
      {
        id: 1,
        name: 'Admin',
        description: 'Admin Profile',
        created_at: new Date().toISOString()
      }
    ]);
    await queryInterface.bulkInsert('functionalities', [
      {
        name: 'customers',
        actions: 7,
        profile_id: 1,
        created_at: new Date().toISOString()
      },
      {
        name: 'employees',
        actions: 7,
        profile_id: 1,
        created_at: new Date().toISOString()
      },
      {
        name: 'profiles',
        actions: 7,
        profile_id: 1,
        created_at: new Date().toISOString()
      },
      {
        name: 'activities',
        actions: 7,
        profile_id: 1,
        created_at: new Date().toISOString()
      },
      {
        name: 'schedules',
        actions: 7,
        profile_id: 1,
        created_at: new Date().toISOString()
      },
      {
        name: 'packages',
        actions: 7,
        profile_id: 1,
        created_at: new Date().toISOString()
      },
      {
        name: 'categories',
        actions: 7,
        profile_id: 1,
        created_at: new Date().toISOString()
      }
    ]);
    await queryInterface.bulkInsert('employees', [
      {
        name: 'Admin',
        email: 'admin@wellness.com',
        //12345678
        password:
          '$2b$08$2JpaJNdyOJpWIl9fl6RcQOK/k8H75EBuFl5uSPEGdsvcbeRCIFxwm',
        profile_id: 1,
        specialty: 'Administrator',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('functionalities', { profile_id: 1 });
    await queryInterface.bulkDelete('profiles', { id: 1 });
    await queryInterface.bulkDelete('employees', { id: 1 });
  }
};
