'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../../models');

var _models2 = _interopRequireDefault(_models);

var _Test = require('../Test.Helper');

var _Test2 = _interopRequireDefault(_Test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect; /**
                                     * Test for User model
                                     */


describe('User Model', function () {
  var requiredFields = ['username', 'firstName', 'lastName', 'email', 'password'];
  var uniqueFields = ['username', 'email'];
  var emptyFields = ['lastName', 'firstName'];
  var defaultRoleId = 2;
  var regularUser = void 0;

  before(function (done) {
    _models2.default.Role.create({ title: 'regular', id: 2 }).then(function () {
      done();
    });
  });
  after(function (done) {
    _models2.default.User.destroy({ where: {} });done();
  });

  describe('Create user', function () {
    it('should create a user', function (done) {
      _models2.default.User.create(_Test2.default.regularUser).then(function (user) {
        regularUser = user.dataValues;
        expect(user.dataValues.firstName).to.equal(_Test2.default.regularUser.firstName);
        expect(user.dataValues.lastName).to.equal(_Test2.default.regularUser.lastName);
        expect(user.dataValues.username).to.equal(_Test2.default.regularUser.username);
        expect(user.dataValues.email).to.equal(_Test2.default.regularUser.email);
        expect(user.dataValues.roleId).to.equal(defaultRoleId);
        expect(user.dataValues.password).to.not.equal(_Test2.default.regularUser.password);
        done();
      });
    });

    it('should not create a user when email is invalid', function (done) {
      _models2.default.User.create(_Test2.default.invalidEmailUser).then().catch(function (error) {
        expect(error.errors[0].message).to.equal('Validation isEmail failed');
        expect(error.errors[0].type).to.equal('Validation error');
        expect(error.errors[0].path).to.equal('email');
        done();
      });
    });
  });

  describe('Unique', function () {
    uniqueFields.forEach(function (field) {
      var uniqueTest = Object.assign({}, _Test2.default.firstUser);
      uniqueTest[field] = _Test2.default.regularUser[field];
      it('should fails for existing ' + field, function (done) {
        _models2.default.User.create(uniqueTest).then().catch(function (error) {
          expect(error.errors[0].message).to.equal(field + ' must be unique');
          expect(error.errors[0].type).to.equal('unique violation');
          expect(error.errors[0].path).to.equal(field);
          done();
        });
      });
    });
  });

  describe('Login In', function () {
    var decryptPassword = void 0;
    it('should login a user', function () {
      _models2.default.User.findOne({ where: { email: _Test2.default.regularUser.email } }).then(function (user) {
        decryptPassword = user.validPassword(_Test2.default.regularUser.password);
        expect(decryptPassword).to.be.equal(true);
        expect(user.password).to.not.equal(_Test2.default.regularUser.password);
      });
    });
  });
});