import { agent } from 'supertest';
import expect from 'expect';
import db from '../../models';
import app from '../../config/App';
import helper from '../Test.Helper';

process.env.NODE_ENV = 'test';

const request = agent(app),
  adminUser = helper.adminUser;
  regularUser = helper.regularUser;

describe('User API', () => {
  let userData,
    regularUserData;

  before((done) => {
    request
  });

});
