/*import { agent } from 'supertest';
import expect from 'expect';

import app from '../../Config/App';
import helper from '../test-helper';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
const server = agent(app);
const newDocument = helper.publicDocument;
const regUser = helper.thirdUser;
const adminDocUser = helper.adminUser;

describe('Document API', () => {
  let documentDetails;
  let regUserData;
  let adminUser;

  before((done) => {
    server
      .post('/users')
      .send(regUser)
      .end((err, res) => {
        regUserData = res.body;
        newDocument.userId = regUserData.user.id;
        newDocument.role = String(regUserData.user.roleId);
        server
          .post('/users')
          .send(adminDocUser)
          .end((err, res) => {
            adminUser = res.body;
          });

        done();
      });
  });


  describe('Create Document', () => {
    it('should create new document', (done) => {
      server
        .post('/documents')
        .set('x-access-token', regUserData.token)
        .send(newDocument)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          documentDetails = res.body;
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual(
            'Your document was created succesfully.');
          if (err) return done(err);
          done();
        });
    });

    it('should return 400 for invalid document data', (done) => {
      server
        .post('/documents')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual(
            'Please type in a title for the document');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/GET Documents', () => {
    it('should 401 for unauthorized user without token', (done) => {
      server
        .get('/documents/?limit=10&offset=1')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          if (err) return done(err);
          done();
        });
    });

    it('should return document with specified id', (done) => {
      server
        .get(`/documents/${documentDetails.createdDoc.id}`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          console.log(res.body, 'document info')
          expect(res.status).toEqual(200);
          expect(res.body.searchedDoc.title)
          .toEqual(documentDetails.createdDoc.title);
          if (err) return done(err);
          done();
        });
    });

    it('should return Document Not found for invalid document Id', (done) => {
      const docId = 99910;
      server
        .get('/documents/99910')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('Document not found');
          if (err) return done(err);
          done();
        });
    });

    it('should return documents the specified user', (done) => {
      server
        .get(`/users/${regUserData.user.id}/documents`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return users documents with public and same role ', (done) => {
      server
        .get(`/users/${regUserData.user.id}/documents`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status)
          .toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return 500 code status for invalid document Id', (done) => {
      server
        .get('/documents/maximuf')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(500);
          expect(res.body.message).toEqual(
            'Invalid query details.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/PUT update document', () => {
    const fieldsToUpdate = {
      title: 'Newly Updated Document',
    };

    it('should update document data ', (done) => {
      server
        .put(`/documents/${documentDetails.createdDoc.id}`)
        .set('x-access-token', regUserData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message)
          .toEqual('This document has been updated successfully.');
          if (err) {
            done(err);
          }
          done();
        });
    });
  });

  describe('/DELETE document data', () => {
    it('should delete document data ', (done) => {
      server
        .delete(`/documents/${documentDetails.createdDoc.id}`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message)
          .toEqual('Document deleted succesfully');
          if (err) return done(err);
          done();
        });
    });
  });
});
*/