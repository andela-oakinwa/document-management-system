import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as auth from '../../../../client/actions/Authentication';
import * as types from '../../../../client/actions/ActionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Action', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('creates SET_CURRENT_USER when login has been done',
    () => {
      const user = { username: 'phemi', password: 'oluwafemi' };
      nock('http://localhost:4000')
        .post('/users/login', user)
        .reply(200, {
          body: { token: 'kaiserphemi', user: { userId: 2, roleId: 2 } } });

      const expectedActions = [{ type: types.SET_CURRENT_USER,
        user }];

      const store = mockStore({ auth: {} });

      store.dispatch(auth.login(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
