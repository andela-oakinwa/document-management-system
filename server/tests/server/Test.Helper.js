import faker from 'faker';

const helper = {
  adminRole: {
    id: 1,
    title: 'admin'
  },
  guestRole1: {
    id: 3,
    title: 'guest'
  },
  regularRole: {
    id: 2,
    title: 'regular'
  },
  guestRole2: {
    id: 4,
    title: 'guest2'
  },
  guestRole3: {
    id: 5,
    title: 'guest3'
  },
  sampleRole: {
    id: 6,
    title: 'guestSample'
  },
  adminUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  adminUser1: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  regularUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  regularUser2: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  firstUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  secondUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  thirdUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  usersArray() {
    const users = [];
    for (let i = 0; i <= 10; i += 1) {
      users.push({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    }
    return users;
  },
  invalidEmailUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'kaiser',
    password: faker.internet.password()
  },
  invalidPasswordUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'ola'
  },
  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  },
  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },
  roleDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'role'
  },
  testDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
  }
};
export default helper;
