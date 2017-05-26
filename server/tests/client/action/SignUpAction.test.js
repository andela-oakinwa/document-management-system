import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import userSignupRequest from '../../../../client/actions/SignUpAction';
import * as types from '../../../../client/actions/ActionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('creates ADD_USER when sign up has been done',
    () => {
      const user = {
        username: 'phemi',
        firstName: 'oluwafemi',
        lastName: 'Akinwa',
        email: 'kaiser.phemi@gamil.com',
        password: 'andelatia' };
      nock('http://localhost.com/')
        .post('/users', user)
        .reply(200, {
          body: { user } });

      const expectedActions = [{ type: types.ADD_USER,
        user }];

      // const store = mockStore({ auth: {}, users: [],
      // users: [], search: [], paginate: {}, user: [] });
      const store = mockStore({ users: [] });

      store.dispatch(userSignupRequest(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
