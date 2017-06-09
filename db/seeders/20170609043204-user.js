const bcrypt = require('bcrypt-nodejs');

const salting = bcrypt.genSaltSync(10);

module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('User', [
      {
        username: 'kaiser',
        firstName: 'King',
        lastName: 'Phemi',
        email: 'king.phemi@andela.com',
        password: bcrypt.hashSync('oluwafemi', salting),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'kstick',
        firstName: 'Emmanuel',
        lastName: 'Folarin',
        email: 'emmy@gmail.com',
        password: bcrypt.hashSync('oluwafemi', salting),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'shinobi',
        firstName: 'Hattori',
        lastName: 'Hanzo',
        email: 'shinobi@gmail.com',
        password: bcrypt.hashSync('oluwafemi', salting),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'trinity',
        firstName: 'Jesus',
        lastName: 'Christ',
        email: 'trinity@gmail.com',
        password: bcrypt.hashSync('oluwafemi', salting),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true, validate: true });
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('User', null, {});
  }
};
