'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../../models');

var _models2 = _interopRequireDefault(_models);

var _Test = require('../Test.Helper');

var _Test2 = _interopRequireDefault(_Test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect; /**
                                     * Import dependencies
                                     */


describe('Document Model', function () {
  var userDocument = void 0;
  var regularUser = void 0;
  var requiredFields = ['title', 'content'],
      emptyFields = ['title', 'content', 'access'];

  before(function (done) {
    _models2.default.Role.create({ title: 'regular', id: 2 }).then(function () {
      _models2.default.User.create(_Test2.default.regularUser).then(function (user) {
        regularUser = user.dataValues;
        done();
      });
    });
  });

  after(function (done) {
    _models2.default.Role.destroy({ where: {} });done();
  });

  describe('CREATE Document', function () {
    it('should create a document', function (done) {
      _Test2.default.publicDocument.ownerRoleId = regularUser.roleId;
      _Test2.default.publicDocument.ownerId = regularUser.id;
      _models2.default.Document.create(_Test2.default.publicDocument).then(function (doc) {
        userDocument = doc.dataValues;
        expect(doc.dataValues.title).to.equal(_Test2.default.publicDocument.title);
        expect(doc.dataValues.content).to.equal(_Test2.default.publicDocument.content);
        expect(doc.dataValues).to.have.property('createdAt');
        expect(doc.dataValues.ownerId).to.equal(regularUser.id);
        done();
      });
    });
  });

  describe('Not Null Violation', function () {
    requiredFields.forEach(function (field) {
      it('should return "not null Violation message"', function (done) {
        var notNull = Object.assign({}, _Test2.default.publicDocument);
        notNull[field] = null;
        _models2.default.Document.create(notNull).then().catch(function (error) {
          expect(error.errors[0].message).to.equal(field + ' cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].path).to.equal(field);
          expect(error.errors[0].value).to.equal(null);
          done();
        });
      });
    });
  });

  describe('EMPTY STRING', function () {
    emptyFields.forEach(function (field) {
      it('should return error', function (done) {
        var emptyString = Object.assign({}, _Test2.default.publicDocument);
        emptyString[field] = ' ';
        _models2.default.Document.create(emptyString).then().catch(function (error) {
          expect(error.errors[0].message).to.equal('This field cannot be empty');
          expect(error.errors[0].type).to.equal('Validation error');
          expect(error.errors[0].path).to.equal(field);
          done();
        });
      });
    });
  });

  describe('ACCESS Violation', function () {
    it('should return error when access is not public, private or role', function (done) {
      var accessError = Object.assign({}, _Test2.default.publicDocument);
      accessError.access = 'andela';
      _models2.default.Document.create(accessError).then().catch(function (error) {
        expect(error.errors[0].message).to.equal('public, private or role required');
        expect(error.errors[0].type).to.equal('Validation error');
        expect(error.errors[0].path).to.equal('access');
        done();
      });
    });
  });

  describe('UPDATE Document', function () {
    var newDocument = void 0;
    beforeEach(function (done) {
      _models2.default.Document.findById(userDocument.id).then(function (doc) {
        doc.update({ title: 'new andela book' }).then(function (updatedDocument) {
          newDocument = updatedDocument;
          done();
        });
      });
    });

    it('should give the correct result', function (done) {
      _models2.default.Document.findById(userDocument.id).then(function (doc) {
        expect(doc.dataValues.id).to.equal(newDocument.id);
        expect(doc.dataValues.title).to.equal('new andela book');
        expect(doc.dataValues.content).to.equal(userDocument.content);
        expect(doc.dataValues.access).to.equal(userDocument.access);
        expect(doc.dataValues.ownerId).to.equal(userDocument.ownerId);
        done();
      });
    });
  });
});