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
  var requiredFields = ['username', 'firstname', 'lastname', 'email', 'password'];
  var uniqueFields = ['username', 'email'];
  var emptyFields = ['firstname', 'lastname'];
  var defaultRoleId = 2;
  var regularUser = void 0;

  before(function (done) {
    _models2.default.Role.create({ title: 'regular', id: 2 }).then(function () {
      done();
    });
  });
  after(function (done) {
    _models2.default.Role.destroy({ where: {} });done();
  });

  describe('Create user', function () {
    it('should create a user', function (done) {
      _models2.default.User.create(_Test2.default.regularUser).then(function (user) {
        regularUser = user.dataValues;
        expect(user.dataValues.firstname).to.equal(_Test2.default.regularUser.firstname);
        expect(user.dataValues.lastname).to.equal(_Test2.default.regularUser.lastname);
        expect(user.dataValues.username).to.equal(_Test2.default.regularUser.username);
        expect(user.dataValues.email).to.equal(_Test2.default.regularUser.email);
        expect(user.dataValues.roleId).to.equal(defaultRoleId);
        expect(user.dataValues.password).to.not.equal(_Test2.default.regularUser.password);
        done();
      });
    });

    it('should not create a user when email is invalid', function (done) {
      _models2.default.User.create(_Test2.default.invalidEmailUser).then().catch(function (error) {
        expect(error.errors[0].message).to.equal('Input a valid email address');
        expect(error.errors[0].type).to.equal('Validation error');
        expect(error.errors[0].path).to.equal('email');
        done();
      });
    });

    it('should not create a user when password character is not up to 8', function (done) {
      _models2.default.User.create(_Test2.default.invalidPasswordUser).then().catch(function (error) {
        expect(error.errors[0].message).to.equal('Minimum of 8 characters is required');
        expect(error.errors[0].type).to.equal('Validation error');
        expect(error.errors[0].path).to.equal('validatePassword');
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
          expect(error.errors[0].message).to.equal(field + ' already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          expect(error.errors[0].path).to.equal(field);
          done();
        });
      });
    });
  });

  describe('NOT NULL VIOLATIONS', function () {
    requiredFields.forEach(function (field) {
      it('should fails when ' + field + ' is null', function (done) {
        var nullField = Object.assign({}, _Test2.default.secondUser);
        nullField[field] = null;
        _models2.default.User.create(nullField).then().catch(function (error) {
          expect(error.errors[0].message).to.equal(field + ' cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          done();
        });
      });
    });
  });

  describe('Empty string Violations', function () {
    emptyFields.forEach(function (field) {
      it('should fails when ' + field + ' is empty', function (done) {
        var emptyField = Object.assign({}, _Test2.default.secondUser);
        emptyField[field] = '';
        _models2.default.User.create(emptyField).then().catch(function (error) {
          expect(error.errors[0].message).to.equal('firstName cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].path).to.equal(field);
          done();
        });
      });
    });
  });

  describe('Login In', function () {
    var decryptPassword = void 0;
    it('should login a user', function () {
      _models2.default.User.findOne({ where: { email: regularUser.email } }).then(function (user) {
        decryptPassword = user.validPassword(_Test2.default.regularUser.password);
        expect(decryptPassword).to.be.equal(true);
        expect(user.password).to.not.equal(_Test2.default.regularUser.password);
      });
    });
  });

  describe('Update user', function () {
    var updatedUser = {};
    beforeEach(function (done) {
      var updateD = { firstname: 'olawale', password: 'newnewnewnew' };
      _models2.default.User.findById(regularUser.id).then(function (user) {
        user.update(updateD).then(function (upUser) {
          Object.assign(updatedUser, upUser.dataValues);
          done();
        });
      });
    });

    it('ensures password is hashed', function (done) {
      _models2.default.User.findById(updatedUser.id).then(function (user) {
        expect(user.dataValues.password).is.not.equal(regularUser.password);
        expect(user.dataValues.id).to.equal(regularUser.id);
        expect(user.dataValues.firstname).to.not.equal(regularUser.firstname);
        expect(user.dataValues.email).to.equal(regularUser.email);
        done();
      });
    });
  });
});