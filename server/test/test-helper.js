import faker from 'faker';


module.exports = {
  adminRole: {
    title: 'admin'
  },

  regularRole: {
    title: 'regular'
  },

  role: {
    title: 'author'
  },
  adminUser: {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
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
    lastName: faker.name.lastName(),
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

  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
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

  documentArray() {
    const documentAttributes = [];

    for (let i = 0; i <= 10; i += 1) {
      documentAttributes.push({
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        ownerId: 1
      });
    }

    return documentAttributes;
  },

  userArray() {
    const userAttributes = [];

    for (let i = 0; i <= 10; i += 1) {
      userAttributes.push({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roleId: 2
      });
    }

    return userAttributes;
  }
};
