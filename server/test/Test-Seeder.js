import faker from 'faker';
import bcrypt from 'bcrypt';
import db from '../models';

/**
 * hashPassword
 * convert plain test to a bcrypt hash
 * @param {String} plainPassword plain test
 * @returns {String} bcrypt hash value of the plain password
 */
const hashPassword = plainPassword =>
  bcrypt.hashSync(plainPassword, 10);

export const roles = [{
  title: 'admin'
}, {
  title: 'regular'
}];

export const users = [{
  firstname: 'Oluwafemi',
  lastname: 'Akinwa',
  username: 'kaiser',
  email: 'femi.akinwa@gmail.com',
  password: hashPassword('oluwafemi'),
  roleId: 1

}, {
  firstname: 'Olusegun',
  lastname: 'Akinwa',
  username: 'dealwap',
  email: 'segun@gmail.com',
  password: hashPassword('oluwafemi'),
  roleId: 1
}, {
  firstname: 'Mark',
  lastname: 'Angel',
  username: 'angeli',
  email: 'mark.angel@gmail.com',
  password: hashPassword('andelatia'),
  roleId: 2
}];

export const documents = [{
  title: 'seed document test',
  content: faker.lorem.paragraph(),
  access: 'private',
  ownerId: 1,
  ownerRoleId: '1'
}, {
  title: 'public seed document test',
  content: faker.lorem.paragraph(),
  access: 'public',
  ownerId: 1,
  ownerRoleId: '1'
}];
const seeds = () => {
  db.sequelize.sync({ force: true }).then(() => {
    db.Role.bulkCreate(roles);
    db.User.bulkCreate(users, { individualHooks: true }).then(() => {
      db.Document.bulkCreate(documents);
    });
  });
};

export default seeds();