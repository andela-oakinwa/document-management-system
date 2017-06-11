import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import userSignupRequest from '../../actions/SignupAction';
import * as types from '../../actions/ActionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('creates ADD_USER when sign up has been done',
    () => {
      const user = {
        username: 'oluwafemi',
        firstName: 'Segun',
        lastName: 'Akinwa',
        email: 'femi.akinwa@gmail.com',
        password: 'oluwafemi' };
      nock('http://localhost:4000')
        .post('/users', user)
        .reply(200, {
          body: { user } });

      const expectedActions = [{
        type: types.ADD_USER,
        user
      }];
      const store = mockStore({ users: [] });
      store.dispatch(userSignupRequest(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
