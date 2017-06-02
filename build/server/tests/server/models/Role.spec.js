'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../../models');

var _models2 = _interopRequireDefault(_models);

var _Test = require('../Test.Helper');

var _Test2 = _interopRequireDefault(_Test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

describe('ROLE', function () {
  var guestRole = void 0;
  after(function (done) {
    _models2.default.Role.destroy({ where: {} });
    done();
  });

  describe('Create Role', function () {
    it('should create a role', function (done) {
      _models2.default.Role.create(_Test2.default.guestRole1).then(function (role) {
        guestRole = role.dataValues;
        expect(role.dataValues.title).to.equal(_Test2.default.guestRole1.title);
        expect(role.dataValues.id).to.equal(_Test2.default.guestRole1.id);
        done();
      });
    });

    it('has at least "guest" roles', function () {
      _models2.default.Role.findAll().then(function (roles) {
        expect(roles[0].title).to.equal('guest');
      });
    });
  });

  describe('NOT NULL violation', function () {
    it('should fail when title of a role is null', function (done) {
      var nullTitle = { title: null };
      _models2.default.Role.create(nullTitle).then().catch(function (error) {
        expect(error.errors[0].message).to.equal('title cannot be null');
        expect(error.errors[0].type).to.equal('notNull Violation');
        expect(error.errors[0].value).to.equal(null);
        done();
      });
    });
  });

  describe('Update Role', function () {
    var newRole = void 0;
    before(function (done) {
      _models2.default.Role.findById(guestRole.id).then(function (role) {
        role.update({ title: 'fellow' }).then(function (updatedRole) {
          newRole = updatedRole;
          done();
        });
      });
    });

    it('should update a role', function (done) {
      _models2.default.Role.findById(newRole.id).then(function (role) {
        expect(role.dataValues.id).to.equal(guestRole.id);
        expect(role.dataValues.title).to.not.equal(guestRole.title);
        expect(role.dataValues.title).to.equal('fellow');
        done();
      });
    });
  });

  describe('DELETE role', function () {
    it('should delete a role', function (done) {
      _models2.default.Role.destroy({ where: { id: guestRole.id } }).then(function () {
        _models2.default.Role.findById(guestRole.id).then(function (res) {
          expect(res).to.equal(null);
          done();
        });
      });
    });
  });
});