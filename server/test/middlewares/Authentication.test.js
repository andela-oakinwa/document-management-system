import httpMocks from 'node-mocks-http';
import events from 'events';
import expect from 'expect';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../config/App';
import helper from '../helper/Test.Helper';
import db from '../../models';
import Auth from '../../middlewares/Authentication';

const superRequest = supertest(app);

let request;
const responseEvent = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });

describe('Middleware Unit Test', () => {
  let adminToken, regularToken, regularUser;
  let publicDocument, privateDocument;

  before((done) => {
    db.Role.bulkCreate([
      { title: 'admin', id: 1 },
      { title: 'regular', id: 2 }
    ])
    .then((roles) => {
      helper.adminUser.roleId = roles[0].id;
        helper.regularUser.roleId = roles[1].id;
        db.User.create(helper.adminUser)
          .then(() => {
            superRequest.post('/users/login')
              .send(helper.adminUser)
              .end((error, response) => {
                adminToken = response.body.token;
                db.User.create(helper.regularUser)
                  .then((reUser) => {
                    regularUser = reUser;
                    superRequest.post('/users/login')
                      .send(helper.regularUser)
                      .end((error, response) => {
                        regularToken = response.body.token;
                        done();
                      });
                  });
              });
          });
      )
  });
});
