import supertest from 'supertest';
import chai from 'chai';

import db from '../../../models/';
import app from '../../../Server';
import helper from '../Test.Helper';

const request = supertest.agent(app),
  expect = chai.expect,
  publicDocDetails = helper.publicDocument,
  privateDocDetails = helper.privateDocument,
  roleDocDetails = helper.roleDocument,
  userDetails = helper.firstUser,
  ownerDetails = helper.secondUser,
  compareDates = (firstDate, secondDate) => {
    new Date(firstDate).getTime() <= new Date (secondDate).getTime();
  };
let adminToken, regularToken;
let privateDocument, roleDocument, publicDocument;
let updateDocument, createdDoc;

describe('Document API', () => {
  before((done) => {
    db.Role.bulkCreate([helper.adminRole, helper.regularRole])
      .then((newRoles) => {
        adminRole = newRoles[0];
        regularRole = newRoles[1];
        userDetails.roleId = regularRole.id;
        ownerDetails.roleId = adminRole.id;
        request.post('/users')
          .send(userDetails)
          .end((errand, response) => {
            user = response.body.user;
            token = response.body.token;
            publicDocDetails.ownerId = user.id;
            done();
          });
      });
  });
  after(() => db.Document.sequelize.sync({ force: true }));

  describe('CONTEXT: With existing document', () => {
    beforeEach(() =>
      Document.create(documentParams)
        .then((newDocument) => {
          createdDoc = newDocument;
        }));

    afterEach(() => Document.destroy({ where: {} }));

    describe('Get all GET: /documents', () => {
      it('should return unauthorised without a token', (done) => {
        request.get('/documents')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should return all documents', (done) => {
        request.get('/documents')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body.rows)).to.be.true;
            expect(res.body.length).to.not.equal(0);
            done();
          });
      });
    });

    describe('Get Document GET: /documents/:id', () => {
      it('should get correct document', (done) => {
        request.get(`/documents/${document.id}`)
          .set({ Authorization: token })
          .end((errand, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal(document.title);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.get('/documents/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Edit document PUT: /documents/:id', () => {
      it('updates the document attributes', (done) => {
        const newAttributes = { title: 'New title', content: 'new content' };

        request.put(`/documents/${document.id}`)
          .set({ Authorization: token })
          .send(newAttributes)
          .end((errand, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(newAttributes.title);
            expect(response.body.content).to.equal(newAttributes.content);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.put('/documents/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Delete document DELETE: /documents/:id', () => {
      it('deletes the document', (done) => {
        request.delete(`/documents/${document.id}`)
          .set({ Authorization: token })
          .end((errand, response) => {
            expect(response.status).to.equal(200);
            Document.count().then((count) => {
              expect(count).to.equal(0);
              done();
            });
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.delete('/documents/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Get all GET: /users/:id/documents', () => {
      it('should return all user documents', (done) => {
        request.get(`/users/${document.ownerId}/documents`)
          .set({ Authorization: token })
          .end((errand, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body)).to.be.true;
            expect(response.body.length).to.not.equal(0);
            done();
          });
      });
    });
  });

  describe('CONTEXT: Without existing document', () => {
    before((done) => {
      request.post('/users')
        .send(ownerParams)
        .end((errand, response) => {
          owner = response.body.user;
          ownerToken = response.body.token;
          done();
        });
    });

    describe('Get Private document GET: /documents/:id', () => {
      before(() => {
        privateDocumentParams.ownerId = owner.id;
        return Document.create(privateDocumentParams)
          .then((newPrivateDocument) => {
            privateDocument = newPrivateDocument;
          });
      });

      it('should return permission denied if not owner', (done) => {
        request.get(`/documents/${privateDocument.id}`)
          .set({ Authorization: token })
          .expect(403, done);
      });

      it('should return document for owner', (done) => {
        request.get(`/documents/${privateDocument.id}`)
          .set({ Authorization: ownerToken })
          .expect(200, done);
      });
    });

    describe('Get role document GET: /documents/:id', () => {
      before(() => {
        roleDocumentParams.ownerId = owner.id;

        return Document.create(roleDocumentParams)
          .then((newRoleDocument) => {
            roleDocument = newRoleDocument;
          });
      });

      it('should return permission denied if in different role', (done) => {
        request.get(`/documents/${roleDocument.id}`)
          .set({ Authorization: token })
          .expect(403, done);
      });

      it('should return document for owner', (done) => {
        const sameRoleUserParams = helper.thirdUser;
        sameRoleUserParams.roleId = adminRole.id;

        request.post('/users')
          .send(sameRoleUserParams)
          .end((errand, response) => {
            const sameRoleUserToken = response.body.token;
            request.get(`/documents/${roleDocument.id}`)
              .set({ Authorization: sameRoleUserToken })
              .expect(200, done);
          });
      });
    });

    describe('Create document POST: /document', () => {
      it('creates a new document', (done) => {
        request.post('/documents')
          .set({ Authorization: token })
          .send(documentParams)
          .end((errand, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(documentParams.title);
            done();
          });
      });

      it('fails for invalid document attributes', (done) => {
        const invalidParams = { name: 'new document' };
        request.post('/documents')
          .set({ Authorization: token })
          .send(invalidParams)
          .expect(400, done);
      });
    });
    describe('Edit document POST: /documents/:id', () => {
      before(() => {
        privateDocumentParams.ownerId = owner.id;
        return Document.create(privateDocumentParams)
          .then((newPrivateDocument) => {
            privateDocument = newPrivateDocument;
          });
      });
      it('should return unauthorised if not owner', (done) => {
        const newAttributes = { title: 'Edited title', content: 'new content' };
        request.put(`/documents/${privateDocument.id}`)
          .set({ Authorization: token })
          .send(newAttributes)
          .end((errand, response) => {
            expect(response.status).to.equal(401);
            done();
          });
      });
    });
  });

  describe('CONTEXT: With multiple documents', () => {
    before(() => Document.bulkCreate(documentParamsArray));

    describe('Document Pagination', () => {
      it('uses query params "limit" to limit the result', (done) => {
        request.get('/documents?limit=5')
          .set({ Authorization: token })
          .end((errand, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.rows.length).to.equal(5);
            done();
          });
      });

      it('is returned in order of their published dates', (done) => {
        request.get('/documents?limit=5')
          .set({ Authorization: token })
          .end((errand, response) => {
            const documents = response.body;
            let flag = true;

            for (let i = 0; i < documents.length - 1; i += 1) {
              flag = compareDates(documents[i].createdAt, documents[i + 1].createdAt);
              if (!flag) break;
            }

            expect(flag).to.be.true;
            done();
          });
      });
    });

    describe('Document search', () => {
      it('searches and returns the correct documents', (done) => {
        const query = documentParamsArray[4].title;
        const matcher = new RegExp(query);

        request.get(`/search/documents?q=${query}`)
          .set({ Authorization: token })
          .end((errand, response) => {
            expect(response.status).to.equal(200);
            expect(matcher.test(response.body.rows[0].title)).to.be.true;
            done();
          });
      });

      it('uses query params "limit" to limit the result', (done) => {
        request.get('/search/documents?limit=5')
          .set({ Authorization: token })
          .end((errand, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.rows.length).to.equal(5);
            done();
          });
      });
    });
  });


});
