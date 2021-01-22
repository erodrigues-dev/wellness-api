module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('profiles', [
      {
        id: 1,
        name: 'Admin',
        description: 'Admin Profile',
        permissions: 2097151,
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

  down: async queryInterface => {
    await queryInterface.bulkDelete('profiles', { id: 1 });
    await queryInterface.bulkDelete('employees', { id: 1 });
  }
};
