import faker from 'faker';
import bcrypt from 'bcrypt';

export default {
  userOne: {
    username: 'cardozi',
    firstName: 'Zizi',
    lastName: 'Cardow',
    email: faker.internet.email(),
    password: 'password',
    roleId: 2,
    about: faker.lorem.paragraph(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  userTwo: {
    username: 'bendozi',
    firstName: 'Mark',
    lastName: 'Angel',
    email: faker.internet.email(),
    password: 'password',
    roleId: 2,
    about: faker.lorem.paragraph(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  userThree: {
    username: 'olusegun',
    firstName: 'Olabode',
    lastName: 'Akinwa',
    email: faker.internet.email(),
    password: 'password',
    roleId: 1,
    about: faker.lorem.paragraph(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  privateDocument: {
    title: 'Private Things',
    content: `They were figuratively speaking going at it like bunnies,
    creating ripples of waves around them.`,
    access: 'private',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  roleDocument: {
    title: 'check role document',
    content: 'check role document1',
    access: 'role',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  simpleDocument: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    access: 'public',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  editorOne: {
    username: 'kenpachi',
    fullName: 'Kenpachi Zaraki',
    email: faker.internet.email(),
    password: bcrypt.hashSync('oluwafemi', bcrypt.genSaltSync(10)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  editorTwo: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('olusegun', bcrypt.genSaltSync(10)),
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  invalidUserDetails: {
    username: faker.internet.userName(),
    fullName: faker.name.findName(),
    email: 'myemail@yahoo',
    password: faker.internet.password(),
    roleId: 2
  },
  invalidToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoyLCJpYXQiOjE0OTM2MjQ5MTcsImV4cCI6MTQ5MzcxMTMxN30.A3dy4bPUEa3QsML03UKDjqC9wcmAjV0ub8aWu1niaL',
  roleOne: {
    title: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  admin: {
    email: 'admin@gmail.com',
    password: 'oluwafemi'
  },
  regularUser: {
    email: 'salam@gmail.com',
    password: 'oluwafemi'
  }
};