import faker from 'faker';
import bcrypt from 'bcrypt-nodejs';
import db from '../models';

/**
 * hashPassword
 * convert plain test to a bcrypt hash
 * @param {String} plainPassword plain test
 * @returns {String} bcrypt hash value of the plain password
 */
const hashPassword = plainPassword =>
  bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));

export const roles = [{
  id: 1,
  title: 'admin',
}, {
  id: 2,
  title: 'regular',
}];

export const users = [{
  firstName: 'Oluwafemi',
  lastName: 'Akinwa',
  username: 'kaiser',
  email: 'femi.akinwa@gmail.com',
  password: hashPassword('oluwafemi'),
  roleId: 1

}, {
  firstName: 'Olusegun',
  lastName: 'Akinwa',
  username: 'phemi',
  email: 'segun@gmail.com',
  password: hashPassword('oluwafemi'),
  roleId: 1
}, {
  firstName: 'Mark',
  lastName: 'Angel',
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