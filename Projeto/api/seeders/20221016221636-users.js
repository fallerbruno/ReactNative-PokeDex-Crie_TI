export default {
  up: (queryInterface) => queryInterface.bulkInsert('users', 
    [
      {
        name: "admin",
        password: "admin",
        email: "admin@admin.com",
        age: 99,
        sex: "T",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};