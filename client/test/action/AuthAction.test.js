import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as auth from '../../actions/Authentication';
import * as types from '../../actions/ActionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication Action', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('creates SET_CURRENT_USER when login has been done', () => {
    const user = { email: 'femi.akinwa@gmail.com', password: 'oluwafemi' };
    nock('http://localhost:4000')
      .post('/users/login', user)
      .reply(200, {
        body: { token: 'fdsffsfsdfsd', user: { userId: 2, roleId: 2 } } });
    const expectedActions = [{ type: types.SET_CURRENT_USER,
      user }];
    const store = mockStore({ auth: {} });
    store.dispatch(auth.login(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
