/**
 * Test for User model
 */
import chai from 'chai';
import db from '../../models';
import helper from '../Test.Helper';

const expect = chai.expect;

describe('User Model', () => {
  const requiredFields = [
    'username',
    'firstName',
    'lastName',
    'email',
    'password'
  ];
  const uniqueFields = ['username', 'email'];
  const emptyFields = ['lastName', 'firstName'];
  const defaultRoleId = 2;
  let regularUser;

  before((done) => {
    db.Role.create({ title: 'regular', id: 2 }).then(() => {
      done();
    });
  });
  after((done) => { db.User.destroy({ where: {} }); done(); });

  // describe('Create user', () => {
  //   it('should create a user', (done) => {
  //     db.User.create(helper.regularUser)
  //       .then((user) => {
  //         regularUser = user.dataValues;
  //         expect(user.dataValues.firstName)
  //           .to.equal(helper.regularUser.firstName);
  //         expect(user.dataValues.lastName)
  //           .to.equal(helper.regularUser.lastName);
  //         expect(user.dataValues.username)
  //           .to.equal(helper.regularUser.username);
  //         expect(user.dataValues.email).to.equal(helper.regularUser.email);
  //         expect(user.dataValues.roleId).to.equal(defaultRoleId);
  //         expect(user.dataValues.password)
  //           .to.not.equal(helper.regularUser.password);
  //         done();
  //       });
  //   });

  //   it('should not create a user when email is invalid', (done) => {
  //     db.User.create(helper.invalidEmailUser)
  //       .then()
  //       .catch((error) => {
  //         expect(error.errors[0].message)
  //           .to.equal('Validation isEmail failed');
  //         expect(error.errors[0].type).to.equal('Validation error');
  //         expect(error.errors[0].path).to.equal('email');
  //         done();
  //       });
  //   });
  // });

  describe('Unique', () => {
    uniqueFields.forEach((field) => {
      const uniqueTest = Object.assign({}, helper.firstUser);
      uniqueTest[field] = helper.regularUser[field];
      it(`should fails for existing ${field}`, (done) => {
        db.User.create(uniqueTest)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal(`${field} must be unique`);
          expect(error.errors[0].type).to.equal('unique violation');
          expect(error.errors[0].path).to.equal(field);
          done();
        });
      });
    });
  });

  describe('Login In', () => {
    let decryptPassword;
    it('should login a user', (done) => {
      db.User.findOne({ where: { email: helper.regularUser.email } })
        .then((user) => {
          decryptPassword = user.validPassword(helper.regularUser.password);
          expect(decryptPassword).to.be.equal(true);
          expect(user.password).to.not.equal(helper.regularUser.password);
          done();
        });
    });
  });
});
