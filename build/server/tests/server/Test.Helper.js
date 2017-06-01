'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helper = {
  adminRole: {
    id: 1,
    title: 'admin'
  },
  regularRole: {
    id: 2,
    title: 'regular'
  },
  guestRole1: {
    id: 3,
    title: 'guest'
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
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  adminUser1: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  regularUser: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  regularUser2: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  firstUser: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  secondUser: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  thirdUser: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: _faker2.default.internet.password()
  },
  usersArray: function usersArray() {
    var users = [];
    for (var i = 0; i <= 10; i += 1) {
      users.push({
        username: _faker2.default.internet.username(),
        firstName: _faker2.default.name.firstName(),
        lastName: _faker2.default.name.lastName(),
        email: _faker2.default.internet.email(),
        password: _faker2.default.internet.password()
      });
    }
    return users;
  },

  invalidEmailUser: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: 'kkkkk',
    password: _faker2.default.internet.password()
  },
  invalidPasswordUser: {
    username: _faker2.default.internet.userName(),
    firstname: _faker2.default.name.firstName(),
    lastname: _faker2.default.name.lastName(),
    email: _faker2.default.internet.email(),
    password: 'ola'
  },
  publicDocument: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'public'
  },
  privateDocument: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'private'
  },
  roleDocument: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph(),
    access: 'role'
  },
  testDocument: {
    title: _faker2.default.company.catchPhrase(),
    content: _faker2.default.lorem.paragraph()
  }
};
exports.default = helper;