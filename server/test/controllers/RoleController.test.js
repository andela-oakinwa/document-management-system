/*import supertest from 'supertest';
import expect from 'expect';
import db from '../../models';
import app from '../../Server';
import helper from '../Test.Helper';

const request = supertest.agent(app);
const userParams = helper.firstUser;
let role, token;

describe('Roles API', () => {
  before((done) => {
    db.Role.create(helper.adminRole)
      .then((newRole) => {
        userParams.roleId = newRole.id;
        request.post('/users')
          .send(userParams)
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
  });

  after(() => db.Role.sequelize.sync({ force: true }));

  describe('CONTEXT: With existing role', () => {
    beforeEach(() =>
      db.Role.create(helper.regularRole)
        .then((newRole) => {
          role = newRole;
        }));

    afterEach(() => Role.destroy({ where: { id: role.id } }));

    describe('Get all GET: /roles', () => {
      it('should return unauthorised for no token', (done) => {
        request.get('/roles')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should return all roles', () => {
        request.get('/roles')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).to.not.equal(0);
            done();
          });
      });
    });

    describe('Get role GET: /roles/:id', () => {
      it('should get correct role', () => {
        request.get(`/roles/${role.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).toEqual(role.title);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.get('/roles/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Edit role PUT: /roles/:id', () => {
      it('updates the role attributes', (done) => {
        const newAttributes = { title: 'role' };

        request.put(`/roles/${role.id}`)
          .set({ Authorization: token })
          .send(newAttributes)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).toEqual(newAttributes.title);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.put('/roles/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Delete role DELETE: /roles/:id', () => {
      it('deletes the role', (done) => {
        request.delete(`/roles/${role.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).toEqual(200);
            Role.count().then((count) => {
              expect(count).toEqual(1);
              done();
            });
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.delete('/roles/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });
  });
  
  describe('CONTEXT: without existing role', () => {
    afterEach(() => db.Role.sequelize.sync({ force: true }));

    describe('Create role POST: /roles', () => {
      it('creates a new role', (done) => {
        request.post('/roles')
          .set({ Authorization: token })
          .send({ title: 'authors' })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.title).to.equal('authors');
            done();
          });
      });

      it('fails if user is not an admin', (done) => {
        db.Role.create(helper.regularRole)
          .then((newRole) => {
            helper.secondUser.roleId = newRole.id;
            request.post('/users')
              .send(helper.secondUser)
              .end((err, res) => {
                request.post('/roles')
                  .set({ Authorization: res.body.token })
                  .send({ title: 'other' })
                  .expect(403, done);
              });
          });
      });
    });
  });
});
*/